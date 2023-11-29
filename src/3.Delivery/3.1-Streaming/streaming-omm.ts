// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies
import { Delivery, Session } from '@refinitiv-data/data';

import { OMMRefreshResponse, OMMStatusResponse, OMMStream, OMMUpdateResponse } from '@refinitiv-data/types';
import { getSession } from '../../Common/session';

const session = getSession();

session.on(Session.Event.StateChanged, (_session, state) => console.log('Session state:', state));
session.on(Session.Event.EventReceived, (_session, event) => console.log('Authentication event:', event));
session.on(Session.Event.Error, err => console.log('Session error:', err));

(async () => {
    try {
        await session.open();

        const ommStreamEUR = Delivery.OMMStream.Definition({
            name: 'EUR=',
            fields: ['DSPLY_NAME', 'BID_NET_CH', 'CURRENCY', 'PCTCHNG', 'HIGH_1', 'LOW_1'],
            extendedParams: {
                QoS: {
                    Rate: 'TimeConflated',
                    RateInfo: 10000,
                },
            },
        }).getStream();

        ommStreamEUR.on(Delivery.OMMStream.Event.Refresh, (data: OMMRefreshResponse) => console.log('EUR Refresh:', data));
        ommStreamEUR.on(Delivery.OMMStream.Event.Update, (data: OMMUpdateResponse) => console.log('EUR Update:', data));
        ommStreamEUR.on(Delivery.OMMStream.Event.Status, (data: OMMStatusResponse) => console.log('EUR Status:', data));
        ommStreamEUR.on(Delivery.OMMStream.Event.Complete, (stream: OMMStream) => console.log('EUR Complete'));
        ommStreamEUR.on(Delivery.OMMStream.Event.StateChanged, (stream, state) => console.log('EUR state:', state));
        ommStreamEUR.on(Delivery.OMMStream.Event.Error, (err: Error) => console.log(STREAM_ERROR_MESSAGE, err));

        await ommStreamEUR.open();

        const ommStreamCAD = Delivery.OMMStream.Definition({
            name: 'CAD=',
            fields: ['BID_NET_CH'],
        }).getStream();

        ommStreamCAD.on(Delivery.OMMStream.Event.Refresh, (data: OMMRefreshResponse) => console.log('CAD Refresh:', data));
        ommStreamCAD.on(Delivery.OMMStream.Event.Update, (data: OMMUpdateResponse) => console.log('CAD Update:', data));
        ommStreamCAD.on(Delivery.OMMStream.Event.Status, (data: OMMStatusResponse) => console.log('CAD Status:', data));
        ommStreamCAD.on(Delivery.OMMStream.Event.Complete, (stream: OMMStream) => console.log('CAD Complete'));
        ommStreamCAD.on(Delivery.OMMStream.Event.StateChanged, (stream, state) => console.log('CAD state:', state));
        ommStreamCAD.on(Delivery.OMMStream.Event.Error, (err: Error) => console.log(STREAM_ERROR_MESSAGE, err));

        await ommStreamCAD.open();

        // Item Streams will be closed after 3 seconds
        await new Promise((resolve) => {
            setTimeout(async () => {
                await ommStreamEUR.close();
                await ommStreamCAD.close();
                resolve(void 0);
            }, 3 * 1000);
        });
    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
