import currency from 'currency.js';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addDays from 'date-fns/addDays';
import { checkPeriod, convertMap } from './convutils';
import { daysOfYear } from './dateutils';

export default class InterestsCalc {
  /**
   * Расчет процентов за период.
   * Входные массивы balances и rates можно задавать как Map,
   * так и как обычный объект {'2022-04-01': 0.19, '2022-04-15': 0.3}. Ключем может быть
   * дата или строка формата YYYY-MM-DD
   * @param {Date} begDate дата начала периода
   * @param {Date} endDate дата окончания периода
   * @param {Map} balances остатки (дата->остаток)
   * @param {Map} rates ставки (дата->ставка)
   */
  calcInterests(begDate, endDate, balances, rates) {
    [begDate, endDate] = checkPeriod(begDate, endDate);
    balances = convertMap(balances);
    rates = convertMap(rates);
    return this.getConstPeriods(balances, rates);
  }

  /**
   * Получить периоды постоянства остатка и ставки
   * @param {Map} balances
   * @param {Map} rates
   */
  getConstPeriods(balances, rates) {
    const merged = new Map([...balances, ...rates]);
    const iterator = merged.keys();
    let next = iterator.next();
    const result = [];
    let begDate = next.value;
    let row = {
      begDate: begDate,
      balance: balances.get(begDate),
      rate: rates.get(begDate)
    };
    while (!next.done) {
      next = iterator.next();
      row.endDate = next.value;
      row.days = differenceInCalendarDays(row.endDate, row.begDate);
      row.interests = currency((row.balance * row.rate * row.days) / daysOfYear(row.endDate)).value;
      result.push(row);
      begDate = addDays(next.value, 1);
      row = {
        begDate: begDate,
        balance: balances.get(begDate) || row.balance,
        rate: rates.get(begDate) || row.rate
      };
    }
    return result;
  }
}
