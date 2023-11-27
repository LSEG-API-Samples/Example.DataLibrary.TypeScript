// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		// single Eti full definition
		const definition = IPA.Surfaces.Eti.Definition({
			instrumentCode: 'BNPP.PA@RIC',
			surfaceTag: '1',
			surfaceLayout: {
				format: IPA.Surfaces.Eti.LayoutFormat.Matrix,
				yPointCount: 10,
			},
			surfaceParameters: {
				priceSide: IPA.Surfaces.Eti.PriceSide.Mid,
				volatilityModel: IPA.Surfaces.Eti.VolatilityModel.SVI,
				xAxis: IPA.Surfaces.Eti.AxisUnit.Date,
				yAxis: IPA.Surfaces.Eti.AxisUnit.Strike,
			},
			extendedParams: {
				outputs: [IPA.Surfaces.Eti.Outputs.Constituents],
			},
		});

		const etiSurfaceResponse = await definition.getData(session);
		console.log('Surfaces Eti data: ', etiSurfaceResponse.data.raw);

		// several Eti instruments in single definition (second parameter - short definition)
		const multiVSEti = IPA.Surfaces.Definition({
			definitions: [definition, IPA.Surfaces.Eti.Definition({instrumentCode: 'USD'})],
			extendedParams: {
				outputs: [IPA.Surfaces.Eti.Outputs.Description],
			},
		});
		const multiEtiSurfaceResponse = await multiVSEti.getData(session);
		console.log('Surfaces multiple Eti data: ', multiEtiSurfaceResponse.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
