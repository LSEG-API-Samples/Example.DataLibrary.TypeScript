// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const curveDefinition = {
			currency: 'EUR',
			indexName: 'EURIBOR',
			source: 'Refinitiv',
			discountingTenor: '1Y',
		};

		const zcCurveDefinition1 = IPA.Curves.ZcCurve.Definition({
			curveDefinition,
		});
		const outputs = ['ShouldBeOverriddenByExtendedParams'];

		const zcCurves = IPA.Curves.ZcCurves.Definition({
			universe: [zcCurveDefinition1, IPA.Curves.ZcCurve.Definition({ curveDefinition })],
			outputs,
			extendedParams: {
				outputs: ['Constituents'],
			},
		});

		const zcCurvesData = await zcCurves.getData(session);
		console.log('zcCurvesData data: ', zcCurvesData.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
