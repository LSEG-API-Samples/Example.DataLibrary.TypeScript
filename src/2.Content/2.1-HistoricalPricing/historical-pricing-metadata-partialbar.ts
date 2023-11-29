// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { HistoricalPricing } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const definition = HistoricalPricing.Metadata.Partialbar.Definition({
            name: 'VOD.L',
        });

        const partialbarMetadata = await definition.getData();

        console.log('Partialbar metadata result: 1-1', partialbarMetadata.data.raw);
        console.log('Partialbar metadata result: 1-2', partialbarMetadata.data.table);
    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
