// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { logger } from '@refinitiv-data/data';
import { getSession } from '../Common/session';
// set Debugging=ON for the quick-start test of the session
logger.setLevel(logger.levels.DEBUG);

// Create a session to connect to either 'platform', 'desktop' or 'container' sources
// The user credentials to connect to each session type are read from the 'session.config.json' file
// If the session type is not explicitly specified, then the default session in the config file is used

const session = getSession();
//const session = getSession('platform');
//const session = getSession('desktop');
//const session = getSession('container');

// rest of the code remains unchanged for each session type
(async () => {
	try {
		console.log('Opening the session...');
		
		// open the session
		await session.open();
		
		console.log('Session successfully opened');
	} 
	catch (err) {
		console.log('Session failed to open !');
		console.log(err);
	} 
	finally {
		console.log('Closing the session...');
		await session.close();
	}
})();
