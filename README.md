# TypeScript examples for the LSEG Data Library

## Getting started

### Prerequisites

- Node.js and npm installed on your machine.
- Access to the LSEG data service required by the example and session type you select.

### Install the dependencies

Run these commands from the repository root:

```bash
npm install
npm install @lsegroup/data
```

The examples use `tsx` to run TypeScript files directly. It is installed by the first command as a development dependency.

### Configure a session

Open [`session.config.json`](session.config.json) and replace the placeholder values with your credentials. Set `sessions.default` to the session type you want to use:

```json
{
	"sessions": {
		"default": "platform"
	}
}
```

The supported session types are:

- `platform`: machine account credentials, including `ldpUser`, `ldpPassword`, and `appKey`.
- `desktop`: Workspace Desktop must be running and the configuration must contain a valid application key.
- `container`: browser Workspace environment with a valid container application key.
- `desktopDirect`: Microsoft Entra authentication through an `entraAppId` that has previously been onboarded to LSEG.

Keep `session.config.json` private and do not commit real credentials or application keys.

### Test the session

Before running the other examples, test that the configured default session can be opened and closed successfully:

```bash
npm run example src/1.QuickStart/testSession.ts
```

This example uses `sessions.default` from `session.config.json`. It reports whether the session opened successfully and then closes it.

### Run an example with npm

Run the command from the repository root and provide the path to the example TypeScript file:

```bash
npm run example src/2.Content/2.8-Fundamental/fundamental-reference.ts
```

You can replace the file path with any example in the repository. Most examples use the session configured in `sessions.default`.

### Run an example with the VS Code debugger

1. Open the repository root as the VS Code workspace.
2. Open the example TypeScript file you want to run.
3. Select **Current TS File** in the Run and Debug view.
4. Press **F5** or select **Start Debugging**.

The launch configuration runs the currently open TypeScript file with `tsx` and uses the workspace root as its working directory. The debugger uses the session configured in `sessions.default`.

### Build the examples

To type-check and compile the project, run:

```bash
npm run build
```

Some examples require a live LSEG connection and valid credentials, so a successful build does not guarantee that an example can connect to the selected service.

## Summary

The following series of examples demonstrate how to programmatically access content residing within the LSEG Data Platform using a single, ease of use API called the LSEG Data Library for TypeScript. The platform refers to the layer of data services providing both streaming and non-streaming content serving different clients, from the simple desktop interface to the enterprise application.

The LSEG Data Library is structured as a stack of interfaces and libraries designed to foster the adoption of our platform by both financial coders and professional developers to programmatically access financial content. Based on this stack of interfaces, the examples defined within this section have been organized as follows:

## Content

The Content examples target higher-level abstractions representing financial items like Pricing, News, Historical Data, etc. The Content layer can easily be used by both professional developers and financial coders. It provides great flexibility for commonly used financial objects.


## Delivery

The Delivery examples target the interfaces defined within the lowest abstraction layer of the library. The examples provide core level services including logging and WebSocket customization. In addition, different delivery service examples such as Request/Reply data endpoints, real-time streaming and interfaces supporting queuing capabilities offered for news headlines, stories and research message services.

Please see [LSEG Developers Community](https://developers.lseg.com/en/api-catalog/lseg-data-platform/lseg-data-library-for-typescript) for step by step tutorials on how to use these samples.
