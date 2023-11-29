// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const countPeriodsDefinition1 = IPA.DatesAndCalendars.CountPeriods.Definition({
            tag: 'My request',
            endDate: '2018-02-01',
            startDate: '2017-01-01',
            calendars: ['FMU'],
            dayCountBasis: IPA.DayCountBasisConvention.Dcb_30_360,
            extendedParams: {
                currencies: ['EUR']
            }
        });

        const countPeriodsDefinition2 = IPA.DatesAndCalendars.CountPeriods.Definition({
            tag: 'Test tag 1',
            endDate: '2018-02-01',
            startDate: '2017-01-01',
            calendars: ['EMU'],
            periodType: IPA.DatesAndCalendars.PeriodType.Year,
        });

        const countPeriodsDefinitions = IPA.DatesAndCalendars.CountPeriods.Definitions([countPeriodsDefinition1, countPeriodsDefinition2]);

        const response = await countPeriodsDefinitions.getData();

        console.log('Counted periods tag: ', response.data.countedPeriods[0].tag);
        console.log('Counted periods count of period: ', response.data.countedPeriods[0].count);
        console.log('Counted periods tenor of period: ', response.data.countedPeriods[0].tenor);
        console.log('Raw response: ', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
