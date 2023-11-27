// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const addPeriodsDefinition = IPA.DatesAndCalendars.AddPeriods.Definition({
            tag: 'My request',
            startDate: '2018-01-01',
            period: '6M',
            calendars: ['EMU'],
            dateMovingConvention: IPA.DatesAndCalendars.DateMovingConvention.ModifiedFollowing,
            endOfMonthConvention: IPA.DatesAndCalendars.EndOfMonthConvention.Last,
            holidayOutputs: [
                IPA.DatesAndCalendars.HolidayOutput.Calendars,
                IPA.DatesAndCalendars.HolidayOutput.Countries,
                IPA.DatesAndCalendars.HolidayOutput.Date,
                IPA.DatesAndCalendars.HolidayOutput.Names,
            ],
            extendedParams: {
                currencies: ['EUR'],
            },
        });

        const response = await addPeriodsDefinition.getData();

        console.log('Added periods tag: ', response.data.addedPeriod.tag);
        console.log('Added periods date: ', response.data.addedPeriod.date);
        console.log('Added periods holidays: ', response.data.addedPeriod.holidays);
        console.log('Raw response: ', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
