// tslint:disable:no-console
// tslint:disable-next-line: no-implicit-dependencies
import { Delivery, Session } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

session.on(Session.Event.StateChanged, (_session, state) => console.log('Session state:', state));
session.on(Session.Event.EventReceived, (_session, event) => console.log('Authentication event:', event));
session.on(Session.Event.Error, err => console.log(err));

(async () => {
    try {
        await session.open();

        const historicalPricingRequestParams: Delivery.EndpointRequestDefinitionParams = {
            url: '/data/historical-pricing/v1/views/events/{universe}',
            pathParameters: { universe: 'IBM' },
        };

        const historicalPricingEventsRequestDefinition = Delivery.EndpointRequest.Definition(historicalPricingRequestParams);
        const { data } = await historicalPricingEventsRequestDefinition.getData();

        console.log('Received data for Historical Pricing Events:', data);

        const searchRequestParams: Delivery.EndpointRequestDefinitionParams = {
            url: '/discovery/search/v1/',
            method: Delivery.EndpointRequest.Method.POST,
            bodyParameters: {
                View: 'People',
                Query: 'cto microsoft',
            },
        };

        const searchRequestDefinition = Delivery.EndpointRequest.Definition(searchRequestParams);
        const { data: searchData } = await searchRequestDefinition.getData();

        console.log('Received data for Search:', searchData);
    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
