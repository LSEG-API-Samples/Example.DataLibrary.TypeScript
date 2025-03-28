// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// logging
// Logging can be configured using the lsegroup-data.config.json file 
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************
import { config } from '@lsegroup/data'
import { getSession } from '../Common/session';


// change the logging level
config.set('logs.level', 'debug');
// config.set('logs.level', 'warn');

// enable/disable file or console logger
config.set('logs.transports.console.enabled', true);
// config.set('logs.transports.console.enable', false);
config.set('logs.transports.file.enabled', true);
// config.set('logs.transports.file.enable', false);


const session = getSession();

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
