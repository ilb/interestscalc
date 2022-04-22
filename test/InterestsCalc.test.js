import InterestsCalc, { checkPeriod, filterMap } from '../src/InterestsCalc';

function testSet1() {
  const begDate = new Date('2022-04-01');
  const endDate = new Date('2022-04-30');

  // const rates = new Map();
  // rates.set(new Date('2022-04-01'), 0.19);
  // rates.set(new Date('2022-04-15'), 0.3);

  const rates = {
    '2022-04-01': 0.19,
    '2022-04-15': 0.3
  };
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
