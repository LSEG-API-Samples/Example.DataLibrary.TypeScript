// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const isWorkingDayDefinition = IPA.DatesAndCalendars.IsWorkingDay.Definition({
            tag: 'My request tag',
            date: '2021-01-01',
            calendars: ['FMU'],
            holidayOutputs: [
                IPA.DatesAndCalendars.HolidayOutput.Calendars,
                IPA.DatesAndCalendars.HolidayOutput.Countries,
                IPA.DatesAndCalendars.HolidayOutput.Names,
                IPA.DatesAndCalendars.HolidayOutput.Date,
            ],
            extendedParams: {
                calendars: ['EMU', 'KOR']
            },
        });

        const response = await isWorkingDayDefinition.getData();

        console.log('Is Working Day - tag: ', response.data.day.tag);
        console.log('Is Working Day - is working day?: ', response.data.day.isWorkingDay);
        console.log('Is Working Day - is weekend?: ', response.data.day.isWeekEnd);
        console.log('Is Working Day - holidays: ', response.data.day.holidays);
        console.log('Raw response: ', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
