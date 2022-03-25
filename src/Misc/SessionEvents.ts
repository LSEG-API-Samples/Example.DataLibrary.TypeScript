// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// SessionEvents
// This sample demonstrates how to attach open/authenticate/error events to session object
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************
import { Delivery, Session } from '@refinitiv-data/data';
import { getSession } from '../Common/session';

const session = getSession();

// Session object emits events; attach a callback to listen to these
session.on(Session.Event.StateChanged, (_session, state) => console.log('Session state changed:', state));
session.on(Session.Event.EventReceived, (_session, event) => console.log('Session authentication event:', event));
session.on(Session.Event.Error, err => console.log('Error in session', err));

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// HTTP-GET endpoint request
		const params: Delivery.EndpointRequestDefinitionParams = {
			url: 'data/historical-pricing/v1/views/events/{universe}',
			pathParameters: { universe: 'VOD.L' },
			queryParameters: { 'count': '5' },
		};

		const def = Delivery.EndpointRequest.Definition(params);
		const response = await def.getData(session);

		console.log('Received data:', JSON.stringify(response.data, null, ' '));
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		session.close();
	}
})();
