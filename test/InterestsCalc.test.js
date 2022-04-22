import { default as InterestsCalc, checkPeriod } from '../src/InterestsCalc';

function testSet1() {
  const begDate = new Date('2022-04-01');
  const endDate = new Date('2022-04-30');

  const rates = new Map();
  rates.set(new Date('2022-04-01'), 0.19);
  rates.set(new Date('2022-04-15'), 0.3);
  const remainders = new Map();
  remainders.set(new Date('2022-04-01'), 100000);
  remainders.set(new Date('2022-04-15'), 50000);

  return [begDate, endDate, remainders, rates];
}

const interestsCalc = new InterestsCalc();
test('interests test', () => {
  const [begDate, endDate, remainders, rates] = testSet1();

  const interests = interestsCalc.calcInterests(begDate, endDate, remainders, rates);
  expect(interests).toEqual(undefined);
});

test('checkPeriod', () => {
  const [begDate, endDate] = checkPeriod('2022-04-01', '2022-04-30');
  expect(begDate).toEqual(new Date('2022-04-01'));
  expect(endDate).toEqual(new Date('2022-04-30'));

  expect(() => {
    checkPeriod('2022-05-01', '2022-04-30');
  }).toThrow('begDate if after endDate');
});
