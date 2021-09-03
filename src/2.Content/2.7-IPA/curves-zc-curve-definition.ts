// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const params = {
			source: 'Refinitiv',
			extendedParams: {
				universe: [
					{
						source: 'UBS',
					},
				],
			},
		};

		const curveDefinition = IPA.Curves.ZcCurveDefinition.Definition(params);

		const zcCurveDefinitionData = await curveDefinition.getData(session);
		console.log('getZcCurveDefinition data: ', zcCurveDefinitionData.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
