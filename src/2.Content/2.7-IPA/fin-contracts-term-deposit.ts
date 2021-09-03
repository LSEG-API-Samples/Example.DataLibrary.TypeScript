// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const termDepositDefinition = IPA.FinancialContracts.TermDeposit.Definition({
			notionalCcy: 'EUR',
			tenor: '5Y',
			pricingParameters: { valuationDate: '2020-04-24' },
			fixedRatePercent: 11,
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const universe = [termDepositDefinition];

		const singleDefinitionResult = await termDepositDefinition.getData(session);
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
