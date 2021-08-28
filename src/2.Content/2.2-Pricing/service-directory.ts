// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies
import { Pricing, Session } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// Get the list of all services available on the platform
		const sdDefinition = Pricing.ServiceDirectory.Definition();

		// Get the list of serviceswhich match specified filter
		/*
		const sdDefinition = Pricing.ServiceDirectory.Definition({
			extendedParams: {
				QoS: {
					Rate: 1000,
					Limit: 'Unlimited'
				}
			}
		});
		*/

		const stream = sdDefinition.getStream(session);

		stream.onAdd(data => console.log('Add event:', data));
		stream.onDelete(data => console.log('Delete event:', data));
		stream.onUpdate(data => console.log('Update event:', data));
		stream.onStatus(status => console.log('Status event:', status));
		stream.onComplete(() => console.log('Complete!'));
		stream.onError(error => console.log('Error event:', error));

		await stream.open();
		// await stream.open({withUpdates: false});

		console.log('Description by Name:', stream.getServiceDescription('ELEKTRON_DD'));
		console.log('Description by ID:', stream.getServiceDescription(257));
		console.log('Definition property:', stream.definition);

		console.log('Streaming chain opened, waiting 20 seconds...');
		await new Promise(res => setTimeout(res, 20000));
        
		await stream.close();
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		session.close();
	}
})();
