// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { HistoricalPricing } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const definition = HistoricalPricing.Metadata.Viewlist.Definition({
            name: 'VOD.L',
        });

        const viewlistMetadata = await definition.getData();

        console.log('Viewlist metadata result: 1-1', viewlistMetadata.data.raw);
    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
