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

		// get the most recent headline for Apple Inc
		const hlDef = News.Headlines.Definition({
			query: 'L:EN and Apple',
			count: 1
		});

		const headline = await hlDef.getData(session);

		if(headline.data.table) {
			const storyID = headline.data.table['0'].storyId;
			console.log(`Most recent news headline: ${storyID}`);

			if(typeof(storyID) === 'string')	{
				const stDef = News.Story.Definition(storyID);
				const newsStory = await stDef.getData(session);
				console.log('News story: ', newsStory.data);
			}
		}
		else {
			console.log('No headline received');
		}
	} 
	catch (err) {
		console.log(err);
	} 
	finally {
		await session.close();
	}
})();
