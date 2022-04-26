import { daysOfYear, isLeapYear } from '../src/dateutils';

test('isLeapYear', () => {
  expect(isLeapYear(2020)).toEqual(true);
  expect(isLeapYear(2021)).toEqual(false);
  expect(isLeapYear(new Date('2020-03-15'))).toEqual(true);
  expect(isLeapYear(new Date('2021-04-15'))).toEqual(false);
});

test('daysOfYear', () => {
  expect(daysOfYear(2020)).toEqual(366);
  expect(daysOfYear(2021)).toEqual(365);
});
