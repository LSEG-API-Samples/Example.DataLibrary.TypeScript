// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const capFloorDefinition = IPA.FinancialContracts.CapFloor.Definition({
			notionalCcy: 'EUR',
			buySell: IPA.FinancialContracts.CapFloor.BuySell.Buy,
			capStrikePercent: 1,
			startDate: '2019-02-11',
			tenor: '5Y',
			interestPaymentFrequency: IPA.FinancialContracts.CapFloor.PaymentFrequency.Quarterly,
			amortizationSchedule: [
				{
					amortizationType: IPA.FinancialContracts.CapFloor.AmortizationType.Schedule,
					startDate: '2021-02-11',
					endDate: '2022-02-11',
					amount: 100000,
				},
				{
					amortizationType: IPA.FinancialContracts.CapFloor.AmortizationType.Schedule,
					startDate: '2022-02-11',
					endDate: '2023-02-11',
					amount: 100000,
				},
			],
			pricingParameters: { valuationDate: '2020-04-24' },
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const universe = [capFloorDefinition];

		const singleDefinitionResult = await capFloorDefinition.getData(session);
		console.log('SingleDefinitionResult data: ', singleDefinitionResult.data);

		const fcDefinitionResult = await IPA.FinancialContracts.Definition({
			definitions: universe,
			extendedParams: {
				fields: ['InstrumentTag', 'InstrumentCode'],
			},
		}).getData(session);
		console.log('FCDefinitionResult data: ', fcDefinitionResult.data);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
