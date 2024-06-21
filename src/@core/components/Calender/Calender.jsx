// persianLocale.js
import { enUS } from "date-fns/locale";

const persianLocale = {
  ...enUS, // Inherit everything from English locale
  code: "fa",
  formatDistance: () => "", // Implement Persian formatting as needed
  formatLong: {
    format: {
      year: "yyyy",
      month: "MMMM yyyy",
      monthDay: "MMMM d, yyyy",
      weekday: "EEEE",
      weekdayShort: "EEE",
      weekdayLong: "EEEE",
      hour: "HH:mm",
      minute: "HH:mm",
      second: "HH:mm:ss",
    },
  },
  localize: {
    // Implement Persian localization as needed
    ordinalNumber: () => "",
    era: () => "",
    quarter: () => "",
    month: () => "",
    day: () => "",
    dayPeriod: () => "",
  },
  match: {
    // Implement Persian matching as needed
    ordinalNumber: () => "",
    era: () => "",
    quarter: () => "",
    month: () => "",
    day: () => "",
    dayPeriod: () => "",
  },
  options: {
    // Implement Persian options as needed
    weekStartsOn: 6, // Saturday is the first day of the week in Persian calendar
    firstWeekContainsDate: 1, // First week contains the 1st day of the year
  },
  parse: () => null, // Implement Persian parsing as needed
};

export default persianLocale;
