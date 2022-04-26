/**
 * Количество дней в году
 * @param {Int} year
 * @returns
 */
export function daysOfYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

/**
 * Является ли год високосным
 * @param {Int} year
 * @returns boolean
 */
export function isLeapYear(year) {
  if (year instanceof Date) {
    year = year.getFullYear();
  }
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
