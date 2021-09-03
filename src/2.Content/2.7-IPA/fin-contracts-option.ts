// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const optionDefinition = IPA.FinancialContracts.Option.Definition({
			underlyingType: IPA.FinancialContracts.Option.UnderlyingType.Fx,
			strike: 265,
			underlyingDefinition: {
				fxCrossCode: 'AUDUSD',
			},
			notionalCcy: 'AUD',
			tenor: '5M',
			pricingParameters: {
				priceSide: IPA.FinancialContracts.Option.PriceSide.Mid,
				valuationDate: '2018-08-06',
				pricingModelType: IPA.FinancialContracts.Option.PricingModelType.BlackScholes,
				fxSpotObject: { bid: 0.7387, ask: 0.7387, mid: 0.7387 },
			},
			outputs: [IPA.FinancialContracts.Option.Outputs.Data, IPA.FinancialContracts.Option.Outputs.Headers],
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const singleDefinitionResult = await optionDefinition.getData(session);
		console.log('SingleDefinitionResult data: ', singleDefinitionResult.data);

		const fcDefinitionResult = await IPA.FinancialContracts.Definition({
			definitions: [IPA.FinancialContracts.Option.Definition('FCHI560000L0.p'), optionDefinition],
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
