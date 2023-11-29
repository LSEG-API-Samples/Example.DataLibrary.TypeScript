// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		// single Cap full definition
		const definition = IPA.Surfaces.Cap.Definition({
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
			extendedParams: {
				outputs: [IPA.Surfaces.Cap.Outputs.Constituents],
			},
		});

		const capSurfaceResponse = await definition.getData(session);
		console.log('Surfaces Cap data: ', capSurfaceResponse.data.raw);

		// several Cap instruments in single definition (second parameter - short definition)
		const multiVSCap = IPA.Surfaces.Definition({
			definitions: [definition, IPA.Surfaces.Cap.Definition({ instrumentCode: 'USD' })],
			extendedParams: {
				outputs: [IPA.Surfaces.Cap.Outputs.Description],
			},
		});
		const multiCapSurfaceResponse = await multiVSCap.getData(session);
		console.log('Surfaces multiple Cap data: ', multiCapSurfaceResponse.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
