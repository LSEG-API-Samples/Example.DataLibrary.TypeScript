// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// promise
// An example of how to chain the outputs of the functions for use with promise
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { FundamentalAndReference } from '@refinitiv-data/data';
import { getSession } from '../Common/session';

const session = getSession();

// Chain all the promises so that the complete chain will execute in series. 
// Any exception in the chain will be caught and logged at the end of the chain.
session
	// open the session
	.open()
	// if successful, get a FundamentalAndReference data
	.then(() => {
		const fundAndRefDefinition = FundamentalAndReference.Definition(
			['IBM', 'GOOGL.O', 'MSFT.O'],
			['TR.PriceClose', 'TR.Volume', 'TR.PriceLow'],
		);
		return fundAndRefDefinition.getData(session);
	})
	// if data response successful, print out the data
	.then(response => {
		console.log('F&R response data:', response.data.table);
	})
	// catch any errors from above
	.catch(e => console.error(e))
	// finally, close the session
	.finally(() => {
		session.close();
	});
