// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

import { News } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
	try {
		console.log('Opening the session...');
		// open the session
		await session.open();
		console.log('Session open, sending data request');

		// create a News defination and request 25 headlines. Sample queries:
		// Top News: [query: 'Refinitiv']
		// News on Apple for last 5 days: [query: 'Apple last 5 days']
		// News on Apple in a specific date range: [query: 'Apple daterange:2020-06-01,2020-06-07']
		const definition = News.Headlines.Definition({
			query: 'Refinitiv',
			sort: News.Headlines.SortDirection.NewToOld,
			count: 25
		});

		const headlines = await definition.getData(session);

		if(headlines.data.table) {
			console.log('News Headlines: ');
			console.table(headlines.data.table);
		}
		else {
			console.log('No data received');
		}
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		await session.close();
	}
})();
