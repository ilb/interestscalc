import currency from 'currency.js';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addDays from 'date-fns/addDays';
import { checkPeriod, convertDate, convertMap } from './convutils';
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
    balances = convertMap(balances, convertDate);
    rates = convertMap(rates, convertDate);
    const uniqueDates = this.getUniqueDates([...balances.keys(), ...rates.keys()]);
    const constPeriods = this.getConstPeriods(begDate, endDate, uniqueDates);
    return this.calcConstPeriods(constPeriods, balances, rates);
  }

  /**
   * Получить уникальные даты из массив
   * @param {Map} dates массив дат
   * @returns массив уникальных дат
   */
  getUniqueDates(dates) {
    //т.к. одинаковые даты это разные объекты, то переводим дату в миллисекунды
    const uniqueSet = new Set(dates.map((d) => d.getTime()));
    // переведем в массив дат
    const uniqueDates = [...uniqueSet].map((d) => new Date(d));
    return uniqueDates;
  }
  /**
   * Получить периоды постоянства остатка и ставки
   * @param {Map} balances
   * @param {Map} rates
   */
  getConstPeriods(begDate, endDate, uniqueDates) {
    // удалим дату начала
    uniqueDates.shift();
    // добавим конечный период
    uniqueDates.push(endDate);
    let result = [];
    let prevDate = begDate;
    uniqueDates.forEach((date) => {
      result.push({ begDate: prevDate, endDate: date });
      prevDate = addDays(date, 1);
    });
    return result;
  }
  calcConstPeriods(periods, balances, rates) {
    let balance, rate;
    return periods.map((row) => {
      balance = balances.get(row.begDate) || balance;
      rate = rates.get(row.begDate) || rate;
      row.balance = balance;
      row.rate = rate;
      row.days = differenceInCalendarDays(row.endDate, row.begDate);
      row.interests = currency((row.balance * row.rate * row.days) / daysOfYear(row.endDate)).value;
      return row;
    });
  }
}
