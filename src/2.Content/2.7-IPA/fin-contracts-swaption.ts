// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const swaptionDefinition = IPA.FinancialContracts.Swaption.Definition({
			instrumentTag: 'myEURswaption',
			settlementType: IPA.FinancialContracts.Swaption.OptionSettlementType.Cash,
			tenor: '5Y',
			strikePercent: 2,
			buySell: IPA.FinancialContracts.Swaption.BuySell.Buy,
			callPut: IPA.FinancialContracts.Swaption.CallPut.Call,
			exerciseStyle: IPA.FinancialContracts.Swaption.ExerciseStyle.Euro,
			underlyingDefinition: {
				tenor: '5Y',
				template: 'EUR_AB6E',
			},
			pricingParameters: { valuationDate: '2020-04-24' },
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const universe = [swaptionDefinition];

		const singleDefinitionResult = await swaptionDefinition.getData(session);
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
