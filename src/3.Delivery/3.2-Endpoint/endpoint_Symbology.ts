// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// endpoint_Symbology
// This sample demonstrates how to invoke a REST endpoint at Refinitiv Data Platform
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************
import { Delivery, Session } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// HTTP-POST endpoint request
		const params: Delivery.EndpointRequestDefinitionParams = {
			url: 'discovery/symbology/v1/lookup',
			bodyParameters: {
				from: [{'identifierTypes': ['RIC'], 'values': ['MSFT.O']}],
				to: [{
					'identifierTypes': ["ISIN", "LEI", "ExchangeTicker"] 
				}],
				type: 'auto'
			},
			method: Delivery.EndpointRequest.Method.POST,
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
