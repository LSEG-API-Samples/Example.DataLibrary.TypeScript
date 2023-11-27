// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// streaming-MarketPrice
// The streaming Market Price example demonstrates how to request streaming market-price (L1) data from a websocket 
//	connection from the Refinitiv Real-time Optimized
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { Delivery } from '@refinitiv-data/data';
import { OMMRefreshResponse, OMMStatusResponse, OMMStream, OMMUpdateResponse } from '@refinitiv-data/types';

import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// define the data stream for the instrument
		const stream = Delivery.OMMStream.Definition({
			name: 'EUR=',
			fields: ['DSPLY_NAME', 'BID_NET_CH', 'CURRENCY', 'PCTCHNG', 'HIGH_1', 'LOW_1'],
			extendedParams: {
				QoS: {
					Rate: 'TimeConflated',
					RateInfo: 10000,
				},
			},
		}).getStream(session);

		// attach the event listener callbacks
		stream.on(Delivery.OMMStream.Event.Refresh, (data: OMMRefreshResponse) => console.log('Refresh:', data));
		stream.on(Delivery.OMMStream.Event.Update, (data: OMMUpdateResponse) => console.log('Update:', data));
		stream.on(Delivery.OMMStream.Event.Status, (data: OMMStatusResponse) => console.log('Status:', data));
		stream.on(Delivery.OMMStream.Event.Complete, (stream: OMMStream) => console.log('Complete'));
		stream.on(Delivery.OMMStream.Event.StateChanged, (stream, state) => console.log('State:', state));
		stream.on(Delivery.OMMStream.Event.Error, (err: Error) => console.log('Error:', err));

		// open the stream
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
		session.close();
	}
})();
