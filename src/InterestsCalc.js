export default class InterestsCalc {
  /**
   * Расчет процентов за период
   * @param {Date} begDate дата начала периода
   * @param {Date} endDate дата окончания периода
   * @param {Map} remainders остатки (дата->остаток)
   * @param {Map} rates ставки (дата->ставка)
   */
  calcInterests(begDate, endDate, remainders, rates) {
    [begDate, endDate] = checkPeriod(begDate, endDate);
    console.log({ begDate, endDate });
  }
}

/**
 * Проверка периода
 * @param {Date} begDate дата начала периода
 * @param {Date} endDate дата окончания периода
 */
export function checkPeriod(begDate, endDate) {
  if (!(begDate instanceof Date)) {
    begDate = new Date(begDate);
  }
  if (!(endDate instanceof Date)) {
    endDate = new Date(endDate);
  }
  if (begDate > endDate) {
    throw new Error(`begDate if after endDate: ${begDate} > ${endDate}`);
  }
  return [begDate, endDate];
}
