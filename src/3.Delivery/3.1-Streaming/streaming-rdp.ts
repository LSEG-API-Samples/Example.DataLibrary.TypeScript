// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies
import { Delivery, Session, IPA } from '@refinitiv-data/data';

import { RDPAckResponse, RDPResponseResponse, RDPUpdateResponse } from '@refinitiv-data/types';
import { getSession } from '../../Common/session';

const session = getSession();

session.on(Session.Event.StateChanged, (_session, state) => console.log('Session state:', state));
session.on(Session.Event.EventReceived, (_session, event) => console.log('Authentication event:', event));
session.on(Session.Event.Error, err => console.log('Session error:', err));

(async () => {
    try {
        // config.set('apis.streaming.quantitative-analytics.endpoints.financial-contracts.path.default', '/financaaial-contract');

        await session.open();

        const rdpStreamRBH0 = Delivery.RDPStream.Definition({
            universe: {
                instrumentType: IPA.FinancialContracts.Swaption.SWAPTION_INSTRUMENT_TYPE,
                instrumentDefinition: {
                    tenor: "3Y",
                    instrumentCode: 'EURAB6E3Y=',
                },
            },
            fields: [
                "InstrumentDescription",
                "ValuationDate",
                "StartDate",
                "FixedRate",
                "PV01AmountInDealCcy",
                "Duration",
                "ModifiedDuration",
                "TriggerInfoObject",
                "ErrorMessage"
            ],
            parameters: { universeType: 'Symbol' },
            extendedParams: {
                QoS: {
                    Rate: 'TimeConflated',
                    RateInfo: 10000,
                },
            },
        }).getStream();

        rdpStreamRBH0.on(Delivery.RDPStream.Event.Response, (data: RDPResponseResponse) => console.log('RBH0 Refresh:', data));
        rdpStreamRBH0.on(Delivery.RDPStream.Event.Update, (data: RDPUpdateResponse) => console.log('RBH0 Update:', data));
        rdpStreamRBH0.on(Delivery.RDPStream.Event.Ack, (data: RDPAckResponse) => console.log('RBH0 Status:', data));
        rdpStreamRBH0.on(Delivery.RDPStream.Event.Complete, (rdpStream: Delivery.RDPStream) => console.log('RBH0 Complete'));
        rdpStreamRBH0.on(Delivery.RDPStream.Event.StateChanged, (rdpStream, state) => console.log('RBH0 state:', state));

        await rdpStreamRBH0.open();

        const rdpStreamRBPL = Delivery.RDPStream.Definition({
            universe: {
                instrumentType: IPA.FinancialContracts.CDS.CDS_INSTRUMENT_TYPE,
                instrumentDefinition: {
                    tenor: "3Y",
                    instrumentCode: 'CLBMETRD=',
                },
            },
            parameters: { universeType: 'Symbol' },
        }).getStream();

        rdpStreamRBPL.on(Delivery.RDPStream.Event.Response, (data: RDPResponseResponse) => console.log('R.BP.L Response:', data));
        rdpStreamRBPL.on(Delivery.RDPStream.Event.Update, (data: RDPUpdateResponse) => console.log('R.BP.L Update:', data));
        rdpStreamRBPL.on(Delivery.RDPStream.Event.Ack, (data: RDPAckResponse) => console.log('R.BP.L Ack:', data));
        rdpStreamRBPL.on(Delivery.RDPStream.Event.Complete, (rdpStream: Delivery.RDPStream) => console.log('R.BP.L Complete'));
        rdpStreamRBPL.on(Delivery.RDPStream.Event.StateChanged, (rdpStream, state) => console.log('R.BP.L state:', state));

        await rdpStreamRBPL.open();

        // Item Streams will be closed after 3 seconds
        await new Promise((resolve) => {
            setTimeout(async () => {
                await rdpStreamRBH0.close();
                await rdpStreamRBPL.close();
                resolve(void 0);
            }, 3 * 1000);
        });
    } catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
})();
