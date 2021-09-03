// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const forwardCurveDefinition = {
			indexTenor: '3M',
			forwardCurveTag: 'ForwardTag',
			forwardStartDate: '2021-02-01',
			forwardCurveTenors: ['0D', '1D'],
		};

		const swapCurveDefinition = {
			currency: 'EUR',
			indexName: 'EURIBOR',
			discountingTenor: 'OIS',
		};

		const forwardCurveRequestItem = {
			curveDefinition: swapCurveDefinition,
			forwardCurveDefinitions: [forwardCurveDefinition],
			extendedParams: {
				outputs: ['Constituents'],
			},
		};

		const curves = IPA.Curves.ForwardCurve.Definition(forwardCurveRequestItem);

		const forwardCurvesData = await curves.getData(session);
		console.log('ForwardCurves data: ', forwardCurvesData.data);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
