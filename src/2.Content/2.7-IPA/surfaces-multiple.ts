// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const definitionCap = IPA.Surfaces.Cap.Definition({
			instrumentCode: 'USD',
			surfaceTag: 'USD_Strike__Tenor_',
			surfaceLayout: {
				format: IPA.Surfaces.Cap.LayoutFormat.Matrix,
			},
			surfaceParameters: {
				valuationDate: '2020-03-20',
				xAxis: IPA.Surfaces.Cap.AxisUnit.Strike,
				yAxis: IPA.Surfaces.Cap.AxisUnit.Tenor,
			},
			// this individual 'outputs' will be ignored if multiple objects are requested
			outputs: [
				IPA.Surfaces.Cap.Outputs.Data,
				IPA.Surfaces.Cap.Outputs.Description,
			],
			extendedParams: {
				outputs: [IPA.Surfaces.Outputs.Constituents],
			},
		});
		const definitionEti = IPA.Surfaces.Eti.Definition({
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
		});
		const definitionFx = IPA.Surfaces.Fx.Definition({
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
				outputs: [IPA.Surfaces.Outputs.Constituents],
			},
		});
		const definitionSw = IPA.Surfaces.Swaption.Definition({
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
		});

		// Multiple objects
		const multiVS = IPA.Surfaces.Definition({
			definitions: [definitionCap, definitionEti, definitionFx, definitionSw],
			extendedParams: {
				outputs: [IPA.Surfaces.Outputs.Constituents],
			},
		});
		const multiSurfaceResponse = await multiVS.getData(session);
		console.log('Surfaces multiple data: ', multiSurfaceResponse.data.raw);

		// Multiple objects with outputs
		const multiVSWithOutputs = IPA.Surfaces.Definition({
			definitions: [definitionCap, definitionEti, definitionFx, definitionSw],
			// this outputs will be applied for all the objects
			outputs: [
				IPA.Surfaces.Outputs.Headers,
				IPA.Surfaces.Outputs.Constituents,
			],
		});
		const multiVSResponseWithOutputs = await multiVSWithOutputs.getData(session);
		console.log("VolatilitySurfaces multiple with 'outputs' data: ", multiVSResponseWithOutputs.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
