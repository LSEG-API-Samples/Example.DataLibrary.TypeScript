// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const params1 = {
			source: 'Renault',
		};
		const params2 = {
			source: 'Peugeot',
		};

		const curveDefinition1 = IPA.Curves.ZcCurveDefinition.Definition(params1);
		const curveDefinition2 = IPA.Curves.ZcCurveDefinition.Definition(params2);

		const curvesDefinitions = IPA.Curves.ZcCurveDefinitions.Definition({
			universe: [curveDefinition1, curveDefinition2, IPA.Curves.ZcCurveDefinition.Definition({ source: 'Tesla' })],
			extendedParams: {
				universe: [
					{
						source: 'Mercedes',
					},
					{
						source: 'Refinitiv',
					},
				],
			},
		});

		const zcCurveDefinitionsData = await curvesDefinitions.getData(session);
		console.log('getZcCurveDefinitions data: ', zcCurveDefinitionsData.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
