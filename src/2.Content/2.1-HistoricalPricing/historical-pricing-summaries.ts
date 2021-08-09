// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// historical-pricing-summaries
// The HistoricalPricing Summaries example demonstrates both intraday and interday data retrievals from the platform.
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { HistoricalPricing } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// retrieve Intraday Summaries with 1-minute interval. Specify to capture only 12 rows.
		const request1 = HistoricalPricing.Summaries.Definition({
			universe: 'IBM.N',
			interval: HistoricalPricing.Summaries.IntradayInterval.ONE_MINUTE,
			fields: ['TRDPRC_1', 'HIGH_1', 'LOW_1', 'OPEN_PRC', 'NUM_MOVES'],
			count: 12
		});
		
		const response1 = await request1.getData(session);

		if(response1.data.table) {
			console.log('Historical pricing intraday summaries');
			console.table(response1.data.table);
		}
		else {
			console.log('No data received');
		}
		
		// retrieve Interday Summaries with 1-day interval and all the fields
		const request2 = HistoricalPricing.Summaries.Definition({
			universe: 'IBM.N',
			interval: HistoricalPricing.Summaries.InterdayInterval.DAILY,
			count: 5
		});
		
		const response2 = await request2.getData(session);

		if(response2.data.table) {
			console.log('Historical pricing interday summaries');
			console.table(response2.data.table);
		}
		else {
			console.log('No data received');
		}
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		session.close();
	}
})();
