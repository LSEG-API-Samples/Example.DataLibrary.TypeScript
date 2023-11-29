// tslint:disable: no-console
// tslint:disable-next-line: no-implicit-dependencies
import { IPA } from '@refinitiv-data/data';
import { getSession } from '../../Common/session';

const session = getSession();

(async () => {
    try {
        await session.open();

        const addPeriodsDefinition1 = IPA.DatesAndCalendars.AddPeriods.Definition({
            tag: 'My request 1',
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

        const addPeriodsDefinition2 = IPA.DatesAndCalendars.AddPeriods.Definition({
            tag: 'My request 2',
            startDate: '2014-01-01',
            period: '1Y',
            calendars: ['BAR', 'KOR'],
            dateMovingConvention: IPA.DatesAndCalendars.DateMovingConvention.NextBusinessDay,
            endOfMonthConvention: IPA.DatesAndCalendars.EndOfMonthConvention.Last28,
            holidayOutputs: [
                IPA.DatesAndCalendars.HolidayOutput.Calendars,
                IPA.DatesAndCalendars.HolidayOutput.Countries,
            ],
        });

        const addPeriodsDefinitions = IPA.DatesAndCalendars.AddPeriods.Definitions([addPeriodsDefinition1, addPeriodsDefinition2]);

        const response = await addPeriodsDefinitions.getData();

        console.log('Added periods tag: ', response.data.addedPeriods[0].tag);
        console.log('Added periods date: ', response.data.addedPeriods[0].date);
        console.log('Added periods holidays: ', response.data.addedPeriods[0].holidays);
        console.log('Raw response: ', response.data.raw);

    } catch (err) {
        console.log(err);
    } finally {
        session.close();
    }
})();
