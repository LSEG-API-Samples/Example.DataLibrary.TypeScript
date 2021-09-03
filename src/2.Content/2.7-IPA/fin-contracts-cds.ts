// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		await session.open();

		const cdsDefinition = IPA.FinancialContracts.CDS.Definition({
			instrumentTag: 'Cds1_InstrumentCode',
			instrumentCode: 'BNPP5YEUAM=R',
			cdsConvention: IPA.FinancialContracts.CDS.CDSConvention.ISDA,
			tradeDate: '2019-05-21T00:00:00Z',
			stepInDate: '2019-05-22T00:00:00Z',
			startDate: '2019-05-20T00:00:00Z',
			endDateMovingConvention: IPA.FinancialContracts.CDS.BusinessDayConvention.NoMoving,
			adjustToIsdaEndDate: true,
			accruedBeginDate: '2019-05-20T00:00:00Z',
			outputs: [IPA.FinancialContracts.CDS.Outputs.Data, IPA.FinancialContracts.CDS.Outputs.Headers],
			fields: ['YieldPercent'],
			extendedParams: {
				fields: ['NotionalAmount', 'DeliveryStartDate', 'ValuationDate'],
			},
		});
		const universe = [cdsDefinition];

		const singleDefinitionResult = await cdsDefinition.getData(session);
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
