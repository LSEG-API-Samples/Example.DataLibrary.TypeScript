// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const dateScheduleDefinition = IPA.DatesAndCalendars.DateSchedule.Definition({
            startDate: '2019-04-30',
            count: 10,
            frequency: IPA.DatesAndCalendars.Frequency.Weekly,
            calendars: ['EMU', 'GER'],
            dayOfWeek: IPA.DatesAndCalendars.DayOfWeek.Tuesday,
            extendedParams: {
                currencies: ['EUR'],
            }
        });

        const response = await dateScheduleDefinition.getData();

        console.log('Date schedule - received dates: ', response.data.dates);
        console.log('Raw response: ', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
