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
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

/**
 * Последний день месяца
 * @param {Date} date
 * @returns
 */
export function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
