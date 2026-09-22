import {
    DataProtectionScope,
    FilePersistenceWithDataProtection,
    PersistenceCachePlugin,
} from "@azure/msal-node-extensions";
import {
    InteractiveRequest,
    PublicClientApplication,
    InteractionRequiredAuthError,
} from "@azure/msal-node";
import path from "node:path";
import creds from "../../session.config.json";
import open, { apps } from "open";

const filePath = path.join(__dirname, ".msal-cache.json");
const entraAppId = creds.sessions.desktopDirect.entraAppId;

// Open browser to sign user in
const openBrowser = async (url: string) => {
    // You can open a browser window with any library or method you wish to use - the 'open' npm package is used here for demonstration purposes.
    console.log(`Opening browser to: ${url}`);
    await open(url, { app: { name: apps.edge } });
};

const loginRequest: InteractiveRequest = {
    scopes: [`${entraAppId}/.default`],
    openBrowser,
    successTemplate: "Successfully signed in! You can close this window now.",
};

const acquireToken = async () => {
    const dataProtectionScope = DataProtectionScope.CurrentUser;
    const optionalEntropy = "ThisIsOptionalEntropy"; //specifies password or other additional entropy used to encrypt the data.
    const windowsPersistence = await FilePersistenceWithDataProtection.create(
        filePath,
        dataProtectionScope,
        optionalEntropy,
    );
    // Use the persistence object to initialize an MSAL PublicClientApplication with cachePlugin
    const pca = new PublicClientApplication({
        auth: {
            clientId: entraAppId,
            authority: "https://login.microsoftonline.com/organizations",
        },
        cache: {
            cachePlugin: new PersistenceCachePlugin(windowsPersistence),
        },
    });

    const accounts = await pca.getTokenCache().getAllAccounts();
    console.log(`Found ${accounts.length} account(s) in the cache.`);
    if (accounts.length == 1) {
        const silentRequest = {
            account: accounts[0],
            scopes: [`${entraAppId}/.default`],
        };

        return pca.acquireTokenSilent(silentRequest).catch((e) => {
            if (e instanceof InteractionRequiredAuthError) {
                return pca.acquireTokenInteractive(loginRequest);
            }
            throw e;
        });
    } else if (accounts.length > 1) {
        console.log(`Multiple accounts found in the cache. Resetting cache.`);
        for (const account of accounts) {
            await pca.getTokenCache().removeAccount(account);
        }
        return pca.acquireTokenInteractive({
            ...loginRequest,
            prompt: "select_account",
        });
    } else {
        return pca.acquireTokenInteractive(loginRequest);
    }
};

export async function getEntraToken() {
    const { accessToken } = await acquireToken();
    return accessToken;
}
