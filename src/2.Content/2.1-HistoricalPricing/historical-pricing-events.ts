// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// historical-pricing-events
// The HistoricalPricing Events example demonstrates how to capture trade tick-based data.
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

		// retrieve tick pricing events, default 20 rows of data. Specified trades only and specific columns of data.
		const request1 = HistoricalPricing.Events.Definition({
			universe: 'IBM.N', 
			eventTypes: ['trade'],
			fields: ['DATE_TIME', 'EVENT_TYPE', 'TRDPRC_1', 'TRDVOL_1']
		});

		const response1 = await request1.getData(session);

		if(response1.data.table) {
			console.log('Historical Trade events');
			console.table(response1.data.table);
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
