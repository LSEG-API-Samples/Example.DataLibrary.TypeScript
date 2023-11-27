// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { HistoricalPricing } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const definitionWithTypesOfStringType = HistoricalPricing.Metadata.Global.Definition({
            types: 'TimeZones',
            extendedParams: {
                types: 'MultipleFieldMapping'
            }
        });

        const definitionWithTypesOfArrayType = HistoricalPricing.Metadata.Global.Definition({
            types: ['TimeZones'],
            extendedParams: {
                types: ['MultipleFieldMapping']
            }
        });

        const globalMetadata1 = await definitionWithTypesOfStringType.getData();
        const globalMetadata2 = await definitionWithTypesOfArrayType.getData();

        console.log('Global metadata result using types as a string: 1-1', globalMetadata1.data.raw);
        console.log('Global metadata result using types as an array: 2-1', globalMetadata2.data.raw);
    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
