// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const pricingParameters = { valuationDate: '2020-04-24' };
		const bondFutureDefinition = IPA.FinancialContracts.BondFuture.Definition({
			instrumentCode: 'FOATc3',
			pricingParameters,
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const universe = [bondFutureDefinition];

		const singleDefinitionResult = await bondFutureDefinition.getData(session);
		console.log('SingleDefinitionResult data: ', singleDefinitionResult.data.raw);

		const fcDefinitionResult = await IPA.FinancialContracts.Definition({
			definitions: universe,
			extendedParams: {
				fields: ['InstrumentTag', 'InstrumentCode'],
			},
		}).getData(session);
		console.log('FCDefinitionResult data: ', fcDefinitionResult.data.raw);
	} catch (err) {
		console.log(err);
	} finally {
		session.close();
	}
})();
