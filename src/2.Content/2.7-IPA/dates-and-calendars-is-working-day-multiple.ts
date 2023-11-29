// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const isWorkingDayDefinition1 = IPA.DatesAndCalendars.IsWorkingDay.Definition({
            tag: 'My request tag 1',
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


        const isWorkingDayDefinition2 = IPA.DatesAndCalendars.IsWorkingDay.Definition({
            tag: 'My request tag 2',
            date: '2021-03-01',
            calendars: ['FMU'],
            currencies: ['EUR'],
            holidayOutputs: [
                IPA.DatesAndCalendars.HolidayOutput.Calendars,
                IPA.DatesAndCalendars.HolidayOutput.Countries,
            ],
        });

        const isWorkingDayDefinitions = IPA.DatesAndCalendars.IsWorkingDay.Definitions([isWorkingDayDefinition1, isWorkingDayDefinition2]);

        const response = await isWorkingDayDefinitions.getData();

        console.log('Is Working Day - tag: ', response.data.days[1].tag);
        console.log('Is Working Day - is working day?: ', response.data.days[1].isWorkingDay);
        console.log('Is Working Day - is weekend?: ', response.data.days[1].isWeekEnd);
        console.log('Is Working Day - holidays: ', response.data.days[1].holidays);
        console.log('Raw response: ', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
