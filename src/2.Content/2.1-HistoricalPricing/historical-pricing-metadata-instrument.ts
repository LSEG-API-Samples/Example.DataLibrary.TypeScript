// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { HistoricalPricing } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const definitionWithTypesOfStringType = HistoricalPricing.Metadata.Instrument.Definition({
            name: 'MSFT.O',
            types: 'TimeZone,TradingSessions',
            version: 'v2',
        });

        const definitionWithTypesOfArrayType = HistoricalPricing.Metadata.Instrument.Definition({
            name: 'MSFT.O',
            types: ['TimeZone', 'TradingSessions'],
        });

        const instrumentMetadata1 = await definitionWithTypesOfStringType.getData();
        const instrumentMetadata2 = await definitionWithTypesOfArrayType.getData();

        console.log('Instrument metadata data using fields as a string: 1-1', instrumentMetadata1.data.raw);
        console.log('Instrument metadata data using fields as an array: 2-1', instrumentMetadata2.data.raw);
    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
