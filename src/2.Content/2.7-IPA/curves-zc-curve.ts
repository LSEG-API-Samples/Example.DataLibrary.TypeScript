// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		// short definition
		const zcCurveDefinition = {
			currency: 'EUR',
			indexName: 'EURIBOR',
			source: 'Refinitiv',
			discountingTenor: '3M',
		};

		// full definition
		const zcCurveRequestItem = {
			curveDefinition: zcCurveDefinition,
			extendedParams: {
				outputs: ['Constituents'],
			},
		};

		const curves1 = IPA.Curves.ZcCurve.Definition({ curveDefinition: zcCurveDefinition });
		const curves2 = IPA.Curves.ZcCurve.Definition(zcCurveRequestItem);

		const zcCurveData1 = await curves1.getData(session);
		const zcCurveData2 = await curves2.getData(session);
		console.log('zcCurveData1 data: ', zcCurveData1.data.raw);
		console.log('zcCurveData2 data: ', zcCurveData2.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
