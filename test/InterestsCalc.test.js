import InterestsCalc from '../src/InterestsCalc';

function testSet1() {
  const begDate = new Date('2022-04-01');
  const endDate = new Date('2022-04-30');

  const rates = {
    '2022-04-01': 0.19,
    '2022-04-15': 0.3
  };
  const balances = new Map();
  balances.set(new Date('2022-04-01'), 100000);
  balances.set(new Date('2022-04-15'), 50000);

  return [begDate, endDate, balances, rates];
}

function testSet2() {
  const begDate = new Date('2020-12-14');
  const endDate = new Date('2021-01-13');

  const rates = {
    '2020-12-14': 0.1115,
    '2020-12-16': 0.21,
    '2021-01-01': 0.35
  };
  const balances = {
    '2020-12-14': 487384
  };
  return [begDate, endDate, balances, rates];
}

const interestsCalc = new InterestsCalc();
test('interests test 1', () => {
  const [begDate, endDate, balances, rates] = testSet1();

  const interests = interestsCalc.calcInterests(begDate, endDate, balances, rates);
  expect(interests).toEqual(undefined);
});
test('interests test 2', () => {
  const [begDate, endDate, balances, rates] = testSet2();

  const interests = interestsCalc.calcInterests(begDate, endDate, balances, rates);
  expect(interests).toEqual(undefined);
});
