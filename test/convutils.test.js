import { checkPeriod, filterMap } from '../src/convutils';

test('checkPeriod', () => {
  const [begDate, endDate] = checkPeriod('2022-04-01', '2022-04-30');
  expect(begDate).toEqual(new Date('2022-04-01'));
  expect(endDate).toEqual(new Date('2022-04-30'));

  expect(() => {
    checkPeriod('2022-05-01', '2022-04-30');
  }).toThrow('begDate if after endDate');
});

test('filterMap', () => {
  const map = new Map();
  map.set(new Date('2022-03-01'), 0.1);
  map.set(new Date('2022-04-03'), 0.19);
  map.set(new Date('2022-04-15'), 0.3);
  map.set(new Date('2022-05-15'), 0.35);
  const expected = new Map();
  expected.set(new Date('2022-04-01'), 0.1);
  expected.set(new Date('2022-04-03'), 0.19);
  expected.set(new Date('2022-04-15'), 0.3);

  const result = filterMap('2022-04-01', '2022-04-30', map);
  expect(result).toEqual(expected);
});
