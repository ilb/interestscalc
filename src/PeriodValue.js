import { convertTimestamp, convertMap } from './convutils';
const MAX_TIMESTAMP = 8640000000000000;
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
    this.resetCount = 0;
    this.nextCount = 0;
    this.resetIterator();
    this.minDate = this.prevDate;
  }
  resetIterator() {
    this.iterator = this.map.keys();
    this.resetCount++;
    this.nextDate = this.iterator.next().value;
    this.nextValue();
  }
  nextValue() {
    this.prevDate = this.nextDate;
    this.nextDate = this.iterator.next().value || MAX_TIMESTAMP;
    this.nextCount++;
  }
  /**
   * Получить значение на дату
   * @param {Date} date
   */
  get(date) {
    date = convertTimestamp(date);
    if (date < this.minDate) {
      throw new Error(`Invalid date: ${date} < ${this.minDate}`);
    }
    // если дата меньше текущего значения итератора, сбросим итератор
    if (date < this.prevDate) {
      this.resetIterator();
    }
    // перемещаемся по датам, пока не найдем нужный промежуток
    while (!(this.prevDate <= date && date < this.nextDate)) {
      this.nextValue();
    }
    return this.map.get(this.prevDate);
  }
}
