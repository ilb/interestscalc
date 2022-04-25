/**
 * Преобразование даты из строки YYYY-MM-DD в дату
 * @param {*} date
 * @returns Date
 */
export function convertDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date;
}

/**
 * Преобразование объекта в Map (дата => значение)
 * @param {*} map   можно задавать как Map,
 * так и как обычный объект {'2022-04-01': 0.19, '2022-04-15': 0.3}. Ключем может быть
 * дата или строка формата YYYY-MM-DD
 * @returns Map
 */
export function convertMap(map) {
  if (!(map instanceof Map)) {
    map = objToMap(map, convertDate);
  }
  return map;
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
  map = convertMap(map);

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
 * @returns Map
 */
export function objToMap(obj, keyMapper, valueMapper) {
  const map = new Map();
  keyMapper = keyMapper || ((x) => x);
  valueMapper = valueMapper || ((x) => x);

  for (let k of Object.keys(obj)) {
    map.set(keyMapper(k), valueMapper(obj[k]));
  }
  return map;
}
