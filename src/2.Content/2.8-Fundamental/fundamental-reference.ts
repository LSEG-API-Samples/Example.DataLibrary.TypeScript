// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// fundamental-reference
// This example shows how to get fundamental or reference data for any instrument
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { FundamentalAndReference } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// 1. Full with array of universes/fields
		const fundAndRefDefinition1 = FundamentalAndReference.Definition({
			universe: ['IBM', 'GOOGL.O', 'MSFT.O'],
			fields: ['TR.PriceClose', 'TR.Volume', 'TR.PriceLow'],
			parameters: { SDate: '0CY', Scale: 6 },
			extendedParams: {
				fields: ['TR.PriceClose', 'TR.Volume'],
			},
		});
		const fundAndRefResponse1 = await fundAndRefDefinition1.getData(session);
		console.log('Data result 1:', fundAndRefResponse1.data.table);

		// 2. Full with a single universe/field
		const fundAndRefDefinition2 = FundamentalAndReference.Definition({
			universe: 'IBM',
			fields: 'TR.Volume',
			parameters: { SDate: '0CY', Scale: 6 },
		});
		const fundAndRefResponse2 = await fundAndRefDefinition2.getData(session);
		console.log('Data result 2:', fundAndRefResponse2.data.table);

		// 3. Short with a single universe and array of fields
		const fundAndRefDefinition3 = FundamentalAndReference.Definition('GOOGL.O', ['TR.PriceClose', 'TR.Volume', 'TR.PriceLow']);
		const fundAndRefResponse3 = await fundAndRefDefinition3.getData(session);
		console.log('Data result 3:', fundAndRefResponse3.data.table);

		// 4. Short with array of universes and a single field
		const fundAndRefDefinition4 = FundamentalAndReference.Definition(['IBM', 'GOOGL.O'], 'TR.PriceClose');
		const fundAndRefResponse4 = await fundAndRefDefinition4.getData(session);
		console.log('Data result 4:', fundAndRefResponse4.data.table);
	} 
	catch (e) {
		console.log(e);
	} 
	finally {
		await session.close();
	}
})();
