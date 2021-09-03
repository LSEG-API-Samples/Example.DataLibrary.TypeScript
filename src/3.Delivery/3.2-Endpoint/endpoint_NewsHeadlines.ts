// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// endpoint_NewsHeadlines
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

		// HTTP-GET raw endpoint request
		const param: Delivery.EndpointRequestDefinitionParams = {
			url: 'data/news/v1/headlines',
			query: { query: 'Adidas and searchIn:HeadlineOnly and L:EN' },
		};

		const def = Delivery.EndpointRequest.Definition(param);
		const response = await def.getData(session);
		console.log('Received data:', JSON.stringify(response.data, null, ' '));

		// console.log(response.data.data[0].storyId);

	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		session.close();
	}
})();
