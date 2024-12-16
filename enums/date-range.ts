const currentYear = new Date().getFullYear();

// Date Range is from 10yrs-ago to currentYear (eg 2014-2024)
export enum DateRangeEnum {
  lowerYear = currentYear - 10,
  upperYear = currentYear,
}
