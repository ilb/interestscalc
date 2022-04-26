import PeriodValue from '../src/PeriodValue';

test('PeriodValue', () => {
  const rates = {
    '2020-12-14': 0.1115,
    '2020-12-16': 0.21,
    '2021-01-01': 0.35
  };

  const periodValue = new PeriodValue(rates);

  expect(() => periodValue.get('2020-12-13')).toThrow('Invalid date');
  expect(periodValue.get('2020-12-14')).toEqual(0.1115);
  expect(periodValue.get('2020-12-15')).toEqual(0.1115);
  expect(periodValue.nextCount).toEqual(1);
  expect(periodValue.get('2020-12-16')).toEqual(0.21);
  expect(periodValue.nextCount).toEqual(2);
  expect(periodValue.get('2020-12-17')).toEqual(0.21);
  expect(periodValue.get('2021-01-01')).toEqual(0.35);
  expect(periodValue.get('2022-01-01')).toEqual(0.35);
  expect(periodValue.nextCount).toEqual(3);
  expect(periodValue.resetCount).toEqual(1);
  expect(periodValue.get('2020-12-15')).toEqual(0.1115);
  expect(periodValue.nextCount).toEqual(4);
  expect(periodValue.resetCount).toEqual(2);
});
