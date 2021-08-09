// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// search
// The search demonstrates free text and view specific search examples
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { Search } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		const displaySearchResponse = async function (title: string, params: Search.Params) {
			const definition = Search.Definition(params);
			const searchRes = await definition.getData(session);
			console.log(title);
			if (searchRes.data.table)
				console.table(searchRes.data.table);
			else
				console.log('No search result received');
		};


		// search for IBM bonds - basic query
		await displaySearchResponse(`\nIBM Bonds`, {
			query: 'IBM bonds'
		});

		// search for IBM bonds - filter specific criteria
		// await displaySearchResponse(`\nIBM Bonds - Active bonds that have not matured`, {
		//	   view: Search.View.GovCorpInstruments,
		//	   filter: `IssuerTicker eq 'IBM' and IsActive eq true and AssetStatus ne 'MAT'`,
		//	   select: ['ISIN','RIC','IssueDate','Currency','FaceIssuedTotal','CouponRate','MaturityDate']
		// });

		// search for all the RICs where 'LSE' is in the name, exclude all derivatives and ensure the state is active (AC)
		// await displaySearchResponse(`\nActive RICs containing 'LSE', ignoring derivatives`, {
		//	   view: Search.View.Quotes,
		//	   filter: `TickerSymbol eq 'LSE' and AssetType ne 'derivative' and AssetState eq 'AC'`
		// });

		// search for Top CEOs where apple appears in the document - Display DocumentTitle and its subtype/components.
		await displaySearchResponse(`\nTop 3 results for CEOs related with the term 'Apple':`, {
			view: Search.View.People,
			query: 'CEO Apple',
			top: 3,
			select: ['DocumentTitle', 'DTSubjectName', 'DTSimpleType', 'DTCharacteristics']
		});

		// Oil refineries in Venezula, Especially ones that arzen't currently operational (Boost plant status)
		// await displaySearchResponse(`\nListing of Oil refineries in Venezula, especially ones that aren't currently operational:`, {
		//	   view: Search.View.PhysicalAssets,
		//	   filter: `RCSAssetTypeLeaf eq 'oil refinery' and RCSRegionLeaf eq 'Venezuela'`,
		//	   boost: `PlantStatus ne 'Normal Operation'`,
		//	   select: ['DocumentTitle', 'PlantStatus'], 
		//	   top: 100
		// });

		// the youngest CEO's
		await displaySearchResponse(`\nThe youngest CEO's:`, {
			view: Search.View.People,
			query: 'ceo',
			orderBy: new Map([['YearOfBirth', Search.OrderByDirection.desc]]),
			select: ['YearOfBirth', 'DocumentTitle']
		});

		// top currencies for Gov Corp Bonds
		// await displaySearchResponse(`\nTop Currencies for Gov Corp Bonds, ranked by Total Outstanding value, along with maximum coupon of each:`, {
		//	   view: Search.View.GovCorpInstruments,
		//	   top: 0,
		//	   navigators: 'Currency(buckets:5,desc:sum_FaceOutstandingUSD,calc:max_CouponRate)'
		// });

		// top 2 rate indicators for each central bank
		await displaySearchResponse(`\nTop 2 rate indicators for each central bank`, {
			view: Search.View.IndicatorQuotes,
			query: 'rates',
			groupBy: 'CentralBankName',
			groupCount: 2,
			select: ['CentralBankName', 'DocumentTitle', 'RIC']
		});

		// top 10 Gov Corp instruments for specific range of coupon rates and ratings.	Note: "_" in Select means to include default fields.
		// const fil = `CouponRate gt 4 and RatingsScope(RatingType eq 'FSU' and CurrentRatingRank gt 15) and AssetState eq 'AC'`;
		// await displaySearchResponse(``, {
		//	   view: Search.View.GovCorpInstruments,
		//	   top: 10,
		//	   filter: fil,
		//	   select: ['_', `RatingsScope(filter:((RatingType xeq 'FSU')))`, 'RatingX1XRatingRank']
		// });

	}
	catch (err) {
		console.log(err);
	}
	finally {
		session.close();
	}
})();
