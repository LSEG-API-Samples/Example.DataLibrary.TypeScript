// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const repoUnderlyingContract = IPA.FinancialContracts.Repo.RepoUnderlyingContract({
			instrumentCode: 'US1YT=RR',
			paymentBusinessDayConvention: IPA.FinancialContracts.Repo.BusinessDayConvention.NextBusinessDay,
			pricingParameters: {
				repoParameters: {
					initialMarginPercent: 50,
				},
			},
		});

		const repoDefinition = IPA.FinancialContracts.Repo.Definition({
			startDate: '2020-08-17T00:00:00Z',
			endDate: '2020-08-22T00:00:00Z',
			underlyingInstruments: [repoUnderlyingContract],
			pricingParameters: {
				marketDataDate: '2020-08-19T00:00:00Z',
			},
			outputs: [IPA.FinancialContracts.Repo.Outputs.Data, IPA.FinancialContracts.Repo.Outputs.Headers],
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});

		const universe = [repoDefinition];

		const singleDefinitionResult = await repoDefinition.getData(session);
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
