// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const irSwapDefinition = IPA.FinancialContracts.IRSwap.Definition({
			instrumentCode: 'EURAB6E17Y=TWEB',
			startDate: '2020-08-17T00:00:00Z',
			endDate: '2020-08-22T00:00:00Z',
			pricingParameters: {
				valuationDate: '2020-08-21T00:00:00Z',
			},
			outputs: [IPA.FinancialContracts.IRSwap.Outputs.Data, IPA.FinancialContracts.IRSwap.Outputs.Headers],
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});

		const universe = [irSwapDefinition];

		const singleDefinitionResult = await irSwapDefinition.getData(session);
		console.log('SingleDefinitionResult data: ', singleDefinitionResult.data);

		const fcDefinitionResult = await IPA.FinancialContracts.Definition({
			definitions: universe,
			extendedParams: {
				fields: ['InstrumentTag', 'InstrumentCode'],
			},
		}).getData(session);
		console.log('FCDefinitionResult data: ', fcDefinitionResult.data.table);
		console.log('FCDefinitionResult data: ', fcDefinitionResult.data);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
