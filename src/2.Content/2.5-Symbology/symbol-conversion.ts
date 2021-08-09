// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// symbol-conversion
// The SymbolConversion Events example demonstrates how to convert symbol from one identifier to another.
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { SymbolConversion } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		const doSymbolConversion = async function (title: string, params: SymbolConversion.Params) {
			const definition = SymbolConversion.Definition(params);
			const convRes = await definition.getData(session);
			console.log(title);
			if (convRes.data.table)
				console.table(convRes.data.table);
			else
				console.log('No symbol conversion result received');
		};


		// Convert 4 symbol types (ticker, ISIN, CUSIP, SEDOL)
		await doSymbolConversion(`\nDetect and convert symbols of mixed type`, {
			symbols: ["IBM", "US5949181045", "037833100", "BH4HKS3"]
		});

		// // ISIN to RIC conversion
		await doSymbolConversion(`\nISIN to RIC conversion for 2 items:`, {
			symbols: ["US5949181045", "US02079K1079"],
			fromSymbolType: SymbolConversion.SymbolType.ISIN,
			toSymbolType: SymbolConversion.SymbolType.RIC,
		});
		
		// ISINs - convert to RIC and Ticker only.	Include 1 bad ISIN.
		await doSymbolConversion(`\nISIN Lookup for 2 valid items, 1 invalid item - convert to RIC and Ticker only:`, {
			symbols: ["US5949181045", "JUNK", "US02079K1079"],
			fromSymbolType: SymbolConversion.SymbolType.ISIN,
			toSymbolType: [SymbolConversion.SymbolType.RIC, SymbolConversion.SymbolType.Ticker]
	   });
		
		// LipperID conversion
		await doSymbolConversion(`\nLipper ID conversion:`, {
			symbols: '68384554',
			fromSymbolType: SymbolConversion.SymbolType.LipperId
		});
		
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		session.close();
	}
})();


