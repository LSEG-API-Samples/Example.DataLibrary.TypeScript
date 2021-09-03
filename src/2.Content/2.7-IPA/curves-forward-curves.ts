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

		const forwardCurveDefinition1 = IPA.Curves.ForwardCurve.Definition({
			curveDefinition: swapCurveDefinition,
			forwardCurveDefinitions: [forwardCurveDefinition],
			extendedParams: {
				outputs: ['ShouldBeIgnoredIfPassedAsParameterToCurves'],
			},
		});
		const forwardCurveDefinition2 = IPA.Curves.ForwardCurve.Definition({
			curveDefinition: swapCurveDefinition,
			forwardCurveDefinitions: [forwardCurveDefinition],
		});
		const outputs = ['ShouldBeOverriddenByExtendedParams'];

		const forwardCurves = IPA.Curves.ForwardCurves.Definition({
			universe: [forwardCurveDefinition1, forwardCurveDefinition2],
			outputs,
			extendedParams: {
				outputs: ['Constituents'],
			},
		});

		const response = await forwardCurves.getData(session);
		console.log('ForwardCurves data: ', response.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
