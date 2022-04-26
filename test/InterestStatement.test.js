import InterestsCalc from '../src/InterestStatement';

function testSet1() {
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

test('interests test 1', () => {
  const [begDate, endDate, balances, rates] = testSet1();

  const interestsCalc = new InterestsCalc(balances, rates);
  const interests = interestsCalc.calcInterests(begDate, endDate);
  expect(interests).toEqual(undefined);
});
