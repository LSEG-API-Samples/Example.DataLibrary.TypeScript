// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const countPeriodsDefinition = IPA.DatesAndCalendars.CountPeriods.Definition({
            tag: 'My request',
            endDate: '2018-02-01',
            startDate: '2017-01-01',
            calendars: ['FMU'],
            periodType: IPA.DatesAndCalendars.PeriodType.Day,
            dayCountBasis: IPA.DayCountBasisConvention.Dcb_30_360,
            extendedParams: {
                periodType: IPA.DatesAndCalendars.PeriodType.Year
            }
        });

        const response = await countPeriodsDefinition.getData();

        console.log('Counted periods tag: ', response.data.countedPeriod.tag);
        console.log('Counted periods count of period: ', response.data.countedPeriod.count);
        console.log('Counted periods tenor of period: ', response.data.countedPeriod.tenor);
        console.log('Raw response: ', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
