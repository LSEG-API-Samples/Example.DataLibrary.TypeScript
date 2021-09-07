// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies

// **********************************************************************************************************************
// logging
// This sample demonstrates how to set various logging options in code. Logging can also be configured using the rdplibconfig.prod.json file 
//
// Note: To configure settings for your environment, modify the session.config json file 
// **********************************************************************************************************************

import { logger } from '@refinitiv-data/data';
import { getSession } from '../Common/session';

// following shows various options that can be used with logger package

// change the logging level
logger.setLevel(logger.levels.DEBUG);
// logger.setLevel(logger.levels.WARN);

// enable the file and console logger
logger.enableAll();
// logger.disableAll();

// send a custom warning message
logger.warn('This is a WARNING message');
// logger.info('This is an INFO message');


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
