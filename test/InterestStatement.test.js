import InterestStatement, { accruedInterestDates } from '../src/InterestStatement';
import TestDataParser from '@ilb/testdataparser';

function testSet1() {
  const begDate = new Date('2020-12-14');
  const endDate = new Date('2021-01-13');

  const rates = {
    '2020-12-14': 0.1115,
    '2020-12-16': 0.21,
    '2021-01-01': 0.35
  };
  const balances = {
    '2020-12-14': 487384.8
  };
  const expected = [
    {
      balance: 487384.8,
      begDate: new Date('2020-12-14'),
      days: 2,
      endDate: new Date('2020-12-15'),
      interests: 296.96,
      rate: 0.1115
    },
    {
      balance: 487384.8,
      begDate: new Date('2020-12-16'),
      days: 16,
      endDate: new Date('2020-12-31'),
      interests: 4474.35,
      rate: 0.21
    },
    {
      balance: 487384.8,
      begDate: new Date('2021-01-01'),
      days: 13,
      endDate: new Date('2021-01-13'),
      interests: 6075.62,
      rate: 0.35
    }
  ];
  return [begDate, endDate, balances, rates, expected];
}

test('interests test 1', () => {
  const [begDate, endDate, balances, rates, expected] = testSet1();

  const interestStatement = new InterestStatement(balances, rates);
  const result = interestStatement.calcInterests(begDate, endDate);
  expect(result).toEqual(expected);
  const total = interestStatement.calcInterestsTotal(begDate, endDate);
  expect(total).toEqual(10846.93);
});

describe('interests test ods', () => {
  const tdp = new TestDataParser('test/interestsstatement.ods');
  const testData = tdp.parseAllSheets();

  for (const [key, data] of Object.entries(testData)) {
    // here is where the magic happens
    test(`test case ${key}`, () => {
      const begDate = data['/request/'].begDate;
      const endDate = data['/request/'].endDate;
      const balances = new Map(data['#balancesByDate#'].map((row) => [row.date, row.balance]));
      const rates = new Map(data['#ratesByDate#'].map((row) => [row.date, row.rate]));
      const expected = data['#interestsStatement#'];
      const interestStatement = new InterestStatement(balances, rates);
      const result = interestStatement.calcInterests(begDate, endDate);
      expect(result).toEqual(expected);
    });
  }
});

test('accruedInterestDates', () => {
  expect(accruedInterestDates(new Date('2020-12-14'), new Date('2021-01-13'))).toEqual([
    new Date('2021-01-01')
  ]);
  expect(accruedInterestDates(new Date('2021-12-14'), new Date('2022-03-13'))).toEqual([
    new Date('2022-01-01'),
    new Date('2022-02-01'),
    new Date('2022-03-01')
  ]);
});
