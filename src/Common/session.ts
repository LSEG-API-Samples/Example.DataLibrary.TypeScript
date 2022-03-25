// tslint:disable-next-line: no-implicit-dependencies
import { Session } from '@refinitiv-data/data';
import creds from '../../session.config.json';


const createDesktopSession = () =>
	Session.Desktop.Definition({
		appKey: creds.sessions.desktop.appKey!,
	}).getSession();


const createPlatformSession = () =>
	Session.Platform.Definition({
		appKey: creds.sessions.platform.appKey!,
		userName: creds.sessions.platform.rdpUser!,
		password: creds.sessions.platform.rdpPassword!,
		takeSignOnControl: true,
	}).getSession();


const createContainerSession = () =>
	Session.Container.Definition({
		appKey: creds.sessions.container.appKey!,
	}).getSession();


export function getSession(sessionType?: 'platform' | 'desktop' | 'container'): Session.Session {
	const sType = sessionType || creds.sessions.default;
	switch(sType)	{
		case 'platform':
			return createPlatformSession();
		case 'desktop':
			return createDesktopSession();
		case 'container':
			return createContainerSession();
		default:
			throw new Error('Invalid Session Type. Should be either - platform or desktop or container');
	}
}
