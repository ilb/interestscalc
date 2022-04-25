import { convertTimestamp, convertMap } from './convutils';

/**
 * Периодические значения (остатки, ставки и т.д. на дату)
 */
export default class PeriodValue {
  constructor(map) {
    // преобразуем map в ключи unix timestamp, т.к. одинаковые даты не равны в JS
    this.map = convertMap(map, convertTimestamp);
    if (this.map.size < 1) {
      throw new Error('Empty map error');
    }
    this.resetIterator();
    this.minDate = this.prevDate;
  }
  resetIterator() {
    this.iterator = this.map.keys();
    this.nextValue();
  }
  nextValue() {
    this.prevDate = this.iterator.next().value;
    this.nextDate = this.iterator.next().value;
  }
  /**
   * Получить значение на дату
   * @param {Date} date
   */
  get(date) {
    date = convertTimestamp(date);
    if (date < this.minDate) {
      throw new Error(`Invalid date: ${date} < ${minDate}`));
    }

  }
}
