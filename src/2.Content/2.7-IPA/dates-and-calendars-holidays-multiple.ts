// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const holidaysDefinition1 = IPA.DatesAndCalendars.Holidays.Definition({
            tag: 'My request 1',
            startDate: '2018-12-31',
            endDate: '2019-01-03',
            calendars: ['UKR', 'FRA'],
            currencies: ['EUR'],
            extendedParams: {
                holidayOutputs: [
                    IPA.DatesAndCalendars.HolidayOutput.Date,
                    IPA.DatesAndCalendars.HolidayOutput.Names,
                    IPA.DatesAndCalendars.HolidayOutput.Calendars,
                    IPA.DatesAndCalendars.HolidayOutput.Countries,
                ]
            }
        });

        const holidaysDefinition2 = IPA.DatesAndCalendars.Holidays.Definition({
            tag: 'My request 2',
            startDate: '2020-01-01',
            endDate: '2021-01-01',
            calendars: ['FRA'],
            currencies: ['invalid'],
            holidayOutputs: [
                IPA.DatesAndCalendars.HolidayOutput.Calendars,
                IPA.DatesAndCalendars.HolidayOutput.Countries,
            ]
        });

        const holidaysDefinitions = IPA.DatesAndCalendars.Holidays.Definitions([holidaysDefinition1, holidaysDefinition2]);

        const response = await holidaysDefinitions.getData();

        console.log('Holidays: ', response.data.holidays);
        // Holiday attributes
        console.log('Holidays - tag: ', response.data.holidays[1].tag);
        console.log('Holidays - countries: ', response.data.holidays[1].countries);
        console.log('Holidays - calendars: ', response.data.holidays[1].calendars);
        console.log('Holidays - date: ', response.data.holidays[1].date);
        console.log('Holidays - year: ', response.data.holidays[1].year);
        console.log('Holidays - month: ', response.data.holidays[1].month);
        console.log('Holidays - day: ', response.data.holidays[1].day);
        // Holiday names
        console.log('Holidays - names: ', response.data.holidays[1].names);
        // Raw data
        console.log('Raw response', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
