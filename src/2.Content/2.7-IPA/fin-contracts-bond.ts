// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();
(async () => {
	try {
		await session.open();

		const bondDefinition = IPA.FinancialContracts.Bond.Definition({
			instrumentCode: 'US1YT=RR',
			paymentBusinessDayConvention: IPA.FinancialContracts.Bond.BusinessDayConvention.NextBusinessDay,
			pricingParameters: {
				benchmarkYieldSelectionMode: IPA.FinancialContracts.Bond.BenchmarkYieldSelectionMode.Interpolate,
			},
			outputs: [IPA.FinancialContracts.Bond.Outputs.Data, IPA.FinancialContracts.Bond.Outputs.Headers],
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});

		const universe = [bondDefinition];

		const bondResult = await bondDefinition.getData(session);
		console.log('Single Definition result data: ', bondResult.data);

		const allDefinitionResults = await IPA.FinancialContracts.Definition({
			definitions: universe,
			extendedParams: {
				fields: ['InstrumentTag', 'InstrumentCode'],
			},
		}).getData(session);
		console.log('All Definition results data: ', allDefinitionResults.data);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
