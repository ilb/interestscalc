/**
 * Количество дней в году
 * @param {number} year
 * @returns {number}
 */
export function daysOfYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

/**
 * Является ли год високосным
 * @param {number} year
 * @returns {boolean}
 */
export function isLeapYear(year) {
  if (year instanceof Date) {
    year = year.getFullYear();
  }
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
