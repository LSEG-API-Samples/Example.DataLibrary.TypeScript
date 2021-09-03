// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// LocalRTDS
// The following example demonstrates how to open a streaming list of items using the Pricing interface but from a local  
// Refinitiv Realtime Market Data System (formarly ADS)
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { Pricing } from '@refinitiv-data/data';
import { Session } from '@refinitiv-data/data';


// create a session to connect to the local market data system
const session = Session.Platform.Definition({
		appKey: 'NOT_USED',
		host: 'ADS_HOSTNAME_OR_IP_ADDRESS:15000',
		dacs: {
			userName: 'MyDACSUserID',
			applicationId: '255',
			position: '127.0.0.1/MY_PC'
		}
	}).getSession();


(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// specify a list of items and fields to retrieve a snapshot of prices
		const pricingDefinition = Pricing.Definition({
			universe: ['EUR=', 'CAD=', 'GBP='],
			fields: ['DSPLY_NAME', 'BID', 'ASK', 'OPEN_PRC', 'PCTCHNG'],
			extendedParams: {
				QoS: {
					Rate: 'TimeConflated',
					RateInfo: 10000
				}
			}
		});

		const stream = pricingDefinition.getStream(session);

		// attach event listeners to the stream
		stream.onRefresh((refresh, instrument) => console.log(`Refresh for: ${instrument}:`, refresh))
			.onUpdate((update, instrument) => console.log(instrument, update))
			.onStatus((status, instrument) => console.log(`Status for: ${instrument}:`, status))
			.onComplete(() => console.log('Stream refresh complete'))
			.onError(err => console.log(err));

		// open the stream in streaming mode
		await stream.open();
		// run the example for 20 seconds
		await new Promise(res => setTimeout(res, 20000));	
		// close the open stream
		await stream.close();
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		await session.close();
	}
})();
