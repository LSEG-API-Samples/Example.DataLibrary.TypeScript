// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// pricing-streamingChain
// The following example demonstrates how to request and process chains that are active, such as the Nasdaq Top 25. 
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

		const chainDefinition = Pricing.Chain.Definition({
			name: '.AV.HSI',
			skipEmpty: true,
			nameGuessingQuantity: 8,
			extendedParams: {
				QoS: {
					Rate: 'TimeConflated',
					RateInfo: 10000,
				},
			},
		});

	   const streamChain = chainDefinition
			.getStream(session)
			.onAdd((constituent: string, index: number): void => console.log(`Constituent added: ${index}: ${constituent}`))
			.onRemove((constituent: string, index: number) => console.log(`Constituent removed: ${index}: ${constituent}`))
			.onUpdate((newConstituent: string, oldConstituent: string, index: number) => console.log(`Constituent replaced: ${index}: ${oldConstituent}:${newConstituent}`) )
			.onComplete((constituents: string[]) => { 
				console.log('Chain refresh complete');
				console.table(constituents);
			 })
			.onError((err: Error) => console.log('Error', err));

		// open the stream in streaming mode
		await streamChain.open();
		// run the example for 20 seconds
		console.log('Streaming chain opened, waiting 20 seconds...');
		await new Promise(res => setTimeout(res, 20000));	

		console.log('Final Chain constituents');
		console.table(streamChain.constituents);

		// close the open stream
		await streamChain.close();
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		await session.close();
	}
})();
