// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// pricing-streamingCache
// The following example demonstrates the basic usage of the Streaming Cache interfaces. When defining a streaming cache,
// users can optionally pull out live prices from the cache at their leisure.  The interface will automatically manage
// streaming updates as market conditions change and keep the internal cache fresh. 
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { Pricing } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

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
		// open the stream in streaming mode
		await stream.open();
		
		if(stream.state)	{
			for(let i = 0; i < 5; i++) {
				// get and print data from the stream every 5 second
				console.table(
					{
						'EUR=': stream.getFields('EUR='),
						'CAD=': stream.getFields('CAD='),
						'GBP=': stream.getFields('GBP=')
					});
				await new Promise(res => setTimeout(res, 5000));	
			}
		}
		
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
