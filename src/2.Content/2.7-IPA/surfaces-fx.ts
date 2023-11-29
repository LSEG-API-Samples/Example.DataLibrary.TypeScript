// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		// single Fx full definition
		const definition = IPA.Surfaces.Fx.Definition({
			fxCrossCode: 'EURUSD',
			surfaceTag: 'FxVol-EURUSD',
			surfaceLayout: {
				format: IPA.Surfaces.Fx.LayoutFormat.Matrix,
			},
			surfaceParameters: {
				xAxis: IPA.Surfaces.Fx.AxisUnit.Date,
				yAxis: IPA.Surfaces.Fx.AxisUnit.Strike,
				calculationDate: '2018-08-20T00:00:00Z',
				returnAtm: true,
			},
			extendedParams: {
				outputs: [IPA.Surfaces.Fx.Outputs.Constituents],
			},
		});

		const fxSurfaceResponse = await definition.getData(session);
		console.log('Surfaces Fx data: ', fxSurfaceResponse.data.raw);

		// several Fx instruments in single definition (second parameter - short definition)
		const multiVSFx = IPA.Surfaces.Definition({
			definitions: [definition, IPA.Surfaces.Fx.Definition({ fxCrossCode: 'EURUSD' })],
			extendedParams: {
				outputs: [IPA.Surfaces.Fx.Outputs.Description],
			},
		});
		const multiFxSurfaceResponse = await multiVSFx.getData(session);
		console.log('Surfaces multiple Fx data: ', multiFxSurfaceResponse.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
