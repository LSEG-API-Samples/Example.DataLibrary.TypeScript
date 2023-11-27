// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const holidaysDefinition = IPA.DatesAndCalendars.Holidays.Definition({
            tag: 'My request',
            startDate: '2020-01-01',
            endDate: '2021-01-01',
            calendars: ['UKR', 'FRA'],
            currencies: ['EUR'],
            extendedParams: {
                holidayOutputs: [
                    IPA.DatesAndCalendars.HolidayOutput.Calendars,
                    IPA.DatesAndCalendars.HolidayOutput.Countries,
                    IPA.DatesAndCalendars.HolidayOutput.Date,
                    IPA.DatesAndCalendars.HolidayOutput.Names,
                ]
            }
        });

        const response = await holidaysDefinition.getData();

        console.log('Holidays: ', response.data.holidays);
        // Holiday attributes
        console.log('Holidays - tag: ', response.data.holidays[0].tag);
        console.log('Holidays - countries: ', response.data.holidays[0].countries);
        console.log('Holidays - calendars: ', response.data.holidays[0].calendars);
        console.log('Holidays - date: ', response.data.holidays[0].date);
        console.log('Holidays - year: ', response.data.holidays[0].year);
        console.log('Holidays - month: ', response.data.holidays[0].month);
        console.log('Holidays - day: ', response.data.holidays[0].day);
        // Holiday names
        console.log('Holidays - names: ', response.data.holidays[0].names);
        // Raw data
        console.log('Raw response', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
