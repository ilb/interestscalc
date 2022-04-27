/**
 * Преобразование даты из строки YYYY-MM-DD или timestamp в дату
 * @param {*} date
 * @returns {Date}
 */
export function convertDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date;
}
/**
 * Преобразование даты из строки YYYY-MM-DD или Date в unix timestamp
 * @param {*} date
 * @returns {Date}
 */
export function convertTimestamp(date) {
  return convertDate(date).getTime();
}

/**
 * Проверка периода
 * @param {Date} begDate дата начала периода
 * @param {Date} endDate дата окончания периода
 */
export function checkPeriod(begDate, endDate) {
  begDate = convertDate(begDate);
  endDate = convertDate(endDate);
  if (begDate > endDate) {
    throw new Error(`begDate if after endDate: ${begDate} > ${endDate}`);
  }
  return [begDate, endDate];
}

/**
 * Чистка массива по периоду: если дата значения
 * @param {Date} begDate дата начала периода
 * @param {Date} endDate дата окончания периода
 * @param {Map} map значения (дата->значение), отсортированные по дате
 */
export function filterMap(begDate, endDate, map) {
  [begDate, endDate] = checkPeriod(begDate, endDate);

  const result = new Map();
  map.forEach((value, date) => {
    date = convertDate(date);
    if (date < endDate) {
      result.set(date < begDate ? begDate : date, value);
    }
  });
  return result;
}

/**
 * Преобразование объекта в map
 * @param {*} obj входной объект
 * @param {function} keyMapper опциональная функция преобразования ключа
 * @param {*} valueMapper опциональная функция преобразования значения
 * @returns {Map}
 */
export function convertMap(obj, keyMapper, valueMapper) {
  const map = new Map();
  keyMapper = keyMapper || ((x) => x);
  valueMapper = valueMapper || ((x) => x);
  if (obj instanceof Map) {
    obj.forEach((value, key) => {
      map.set(keyMapper(key), valueMapper(value));
    });
  } else {
    for (let key of Object.keys(obj)) {
      map.set(keyMapper(key), valueMapper(obj[key]));
    }
  }
  return map;
}

/**
 * Получить уникальные даты из массива
 * @param {Array} dates массив дат
 * @returns {Array} массив уникальных дат
 */
export function uniqueDates(dates) {
  //т.к. одинаковые даты это разные объекты, то переводим дату в миллисекунды
  const uniqueSet = new Set(dates.map((d) => d.getTime()).sort());
  // и обратно в массив дат
  return [...uniqueSet].map((d) => new Date(d));
}
