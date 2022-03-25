// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// pricing-snapshot
// The following example demonstrates a basic use case of the Pricing interface to retrieve a snapshot of prices from
// the platform.  The interface supports the ability to specify a list of items and the fields for each to retrieve. 
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
		// open the stream in snapshot mode
		await stream.open({withUpdates: false});

		// print all the fields of one item
		console.log('\nEUR=, all fields: ');
		console.table(stream.getFields('EUR='));

		// print one field
		console.log('\nCAD=, BID field value = ', stream.getFieldValue('CAD=', 'BID'));

		// print multiple fields
		console.log('\nGBP=, multiple fields value: ');
		console.table(stream.getFields('GBP=', ['DSPLY_NAME', 'BID', 'ASK']));
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		await session.close();
	}
})();
