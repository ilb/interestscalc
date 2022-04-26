import currency from 'currency.js';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addDays from 'date-fns/addDays';
import PeriodValue from './PeriodValue';
import { checkPeriod, uniqueDates } from './convutils';
import { daysOfYear } from './dateutils';

/**
 * Процентная ведомость
 */
export default class InterestStatement {
  /**
   * Процентная ведомость
   *
   * Входные массивы balances и rates можно задавать как Map,
   * так и как обычный объект {'2022-04-01': 0.19, '2022-04-15': 0.3}. Ключем может быть
   * дата или строка формата YYYY-MM-DD
   * @param {Map} balances остатки (дата->остаток)
   * @param {Map} rates ставки (дата->ставка)
   */
  constructor(balances, rates) {
    this.balances = new PeriodValue(balances);
    this.rates = new PeriodValue(rates);
  }
  /**
   * Расчет процентов за период.
   * @param {Date} begDate дата начала периода
   * @param {Date} endDate дата окончания периода
   */
  calcInterests(begDate, endDate) {
    [begDate, endDate] = checkPeriod(begDate, endDate);

    // все даты измений остатков, ставок, окончания месяца
    const allDates = [
      ...this.balances.dates(),
      ...this.rates.dates(),
      ...accruedInterestDates(begDate, endDate)
    ];
    // уникальные даты
    const calcDates = uniqueDates(allDates);
    // периоды начислений
    const calcPeriods = getConstPeriods(begDate, endDate, calcDates);
    return calcPeriods.map((row) => {
      row.balance = this.balances.get(row.begDate);
      row.rate = this.rates.get(row.begDate);
      row.days = differenceInCalendarDays(row.endDate, row.begDate) + 1;
      row.interests = currency((row.balance * row.rate * row.days) / daysOfYear(row.endDate)).value;
      return row;
    });
  }
}

/**
 * Даты начислений %%
 * @param {Date} begDate
 * @param {Date} endDate
 * @returns
 */
export function accruedInterestDates(begDate, endDate) {
  [begDate, endDate] = checkPeriod(begDate, endDate);
  const result = [];
  let date = firstDayOfNextOfMonth(begDate);
  while (date <= endDate) {
    result.push(date);
    date = firstDayOfNextOfMonth(addDays(date, 1));
  }
  return result;
}

/**
 * Получить периоды постоянства остатка и ставки
 * @param {Map} balances
 * @param {Map} rates
 */
export function getConstPeriods(begDate, endDate, dates) {
  // удалим дату начала
  dates.shift();
  let result = [];
  let prevDate = begDate;
  dates.forEach((date) => {
    result.push({ begDate: prevDate, endDate: addDays(date, -1) });
    prevDate = date;
  });
  // добавим конечный период
  result.push({ begDate: prevDate, endDate });
  return result;
}

/**
 * Первый день следуюшего месяца.
 * @param {Date} date
 * @returns
 */
export function firstDayOfNextOfMonth(date) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  result.setDate(1);
  return result;
}
