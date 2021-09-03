// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const fxSpot = IPA.FinancialContracts.FxCross.Definition({
			fxCrossCode: 'EURGBP',
			fxCrossType: IPA.FinancialContracts.FxCross.FxCrossType.FxSpot,
			pricingParameters: { priceSide: IPA.FinancialContracts.FxCross.PriceSide.Bid },
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const fxSwap = IPA.FinancialContracts.FxCross.Definition({
			fxCrossCode: 'EURGBP',
			fxCrossType: IPA.FinancialContracts.FxCross.FxCrossType.FxSwap,
			legs: [
				{
					legTag: 'received',
					fxLegType: IPA.FinancialContracts.FxCross.FxCrossLegType.SwapFar,
					dealAmount: 1000000,
					tenor: '6M',
				},
				{
					legTag: 'paid',
					fxLegType: IPA.FinancialContracts.FxCross.FxCrossLegType.SwapNear,
					dealCcyBuySell: IPA.FinancialContracts.FxCross.BuySell.Sell,
					dealAmount: 1000000,
					tenor: '1M',
				},
			],
			pricingParameters: { priceSide: IPA.FinancialContracts.FxCross.PriceSide.Bid },
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const universe = [fxSpot, fxSwap];

		const singleDefinitionResult = await fxSpot.getData(session);
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
