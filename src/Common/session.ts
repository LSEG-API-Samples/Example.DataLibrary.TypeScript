// tslint:disable-next-line: no-implicit-dependencies
import { Session } from '@lsegroup/data';
import creds from '../../session.config.json';


const createDesktopSession = () =>
	Session.Desktop.Definition({
		appKey: creds.sessions.desktop.appKey!,
		appName: 'MyApp',
	}).getSession();


const createPlatformSession = () =>
	Session.Platform.Definition({
		appKey: creds.sessions.platform.appKey!,
		grant: {
			userName: creds.sessions.platform.ldpUser!,
			password: creds.sessions.platform.ldpPassword!,
			takeSignOnControl: true,
		},
		appName: 'MyApp'
	}).getSession();


const createContainerSession = () =>
	Session.Container.Definition({
		appKey: creds.sessions.container.appKey!,
		appName: 'MyApp',
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
