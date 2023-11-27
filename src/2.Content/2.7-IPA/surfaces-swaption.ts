// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		// single Swaption full definition
		const definition = IPA.Surfaces.Swaption.Definition({
			instrumentCode: 'EUR',
			surfaceTag: 'My EUR VolCube',
			surfaceLayout: {
				format: IPA.Surfaces.Swaption.LayoutFormat.NDimensionalArray,
			},
			surfaceParameters: {
				xAxis: IPA.Surfaces.Swaption.AxisUnit.Strike,
				yAxis: IPA.Surfaces.Swaption.AxisUnit.Tenor,
				zAxis: IPA.Surfaces.Swaption.AxisUnit.Expiry,
				calculationDate: '2020-04-20',
				shiftPercent: 3,
				includeCapletsVolatility: true,
			},
			extendedParams: {
				outputs: [IPA.Surfaces.Swaption.Outputs.Constituents],
			},
		});

		const swaptionSurfaceResponse = await definition.getData(session);
		console.log('Surfaces Swaption data: ', swaptionSurfaceResponse.data.raw);

		// several Swaption instruments in single definition (second parameter - short definition)
		const multiVSSwaption = IPA.Surfaces.Definition({
			definitions: [definition, IPA.Surfaces.Swaption.Definition({ instrumentCode: 'EUR' })],
			extendedParams: {
				outputs: [IPA.Surfaces.Swaption.Outputs.Description],
			},
		});
		const multiSwaptionSurfaceResponse = await multiVSSwaption.getData(session);
		console.log('Surfaces multiple Swaption data: ', multiSwaptionSurfaceResponse.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
