jest.dontMock('../ViewHelpers');
const ViewHelpers = require('../ViewHelpers');

describe('ViewHelpers', () => {
  describe('dueDate()', () => {
    it('returns a local date', () => {
      expect(ViewHelpers.dueDate('2015-1-1')).toEqual('1/1/2015');
    });
  });

  describe('monthName()', () => {
    const tests = [
      {args: 0,  expected: 'Janurary'},
      {args: 6,  expected: 'July'},
      {args: 11, expected: 'December'}
    ];

    tests.forEach(function(test) {
      it('returns ' + test.expected + ' for the JS month index ' + test.args, () => {
        expect(ViewHelpers.monthName(test.args)).toEqual(test.expected);
      });
    });

    it('returns the month name for its JS index', () => {
      expect(ViewHelpers.monthName(5)).toEqual('June');
    });
  });

  describe('numberToCurrency()', () => {
    it('returns a buck without any arguments', () => {
      expect(ViewHelpers.numberToCurrency('24.99')).toEqual('$24.99');
    })

    it('returns a custom symbol', () => {
      expect(ViewHelpers.numberToCurrency('24.99', '&')).toEqual('&24.99');
    })

    it('adds decimal points to integers', () => {
      expect(ViewHelpers.numberToCurrency(24)).toEqual('$24.00');
    })

    it('returns 0.00 if a number cannot be found', () => {
      expect(ViewHelpers.numberToCurrency('abc')).toEqual('$0.00');
    })
  })

  describe('pluralize()', () => {
    const singular = 'dog';
    const plural = 'dogs';
    const tests = [
      {count: 0, expected: 'dogs'},
      {count: 1, expected: 'dog'},
      {count: 2, expected: 'dogs'}
    ];

    tests.forEach(function(test) {
      it(`returns ${test.expected} for ${singular} when count is ${test.count}`, () => {
        const expected = `${test.count} ${test.expected}`;
        expect(
          ViewHelpers.pluralize(test.count, singular, plural)
        ).toEqual(expected);
      });
    });
  });

  describe('sessionDate()', () => {
    const currentTime = new Date(2016,5,1,8,30,0);

    const tests = [
      {date: '2016-06-01 08:29:00', type: 'minute', expected: '1 minute ago'},
      {date: '2016-06-01 08:25:00', type: 'minutes', expected: '5 minutes ago'},
      {date: '2016-06-01 07:29:00', type: 'hour', expected: '1 hour ago'},
      {date: '2016-06-01 03:10:00', type: 'hours', expected: '5 hours ago'},
      {date: '2016-05-31 08:29:00', type: 'day', expected: '1 day ago'},
      {date: '2016-05-27 08:10:00', type: 'days', expected: '5 days ago'}
    ];

    tests.forEach(function(test) {
      it(`returns ${test.expected} for ${test.date} when current time is ${currentTime}`, () => {
        expect(ViewHelpers.sessionDate(currentTime, test.date)).toEqual(test.expected);
      });
    });

    it('returns the full date when more than a week', () => {
      const date = '2016-05-24 08:10:00'
      expect(ViewHelpers.sessionDate(currentTime, date)).toEqual('Tue May 24 2016 at 8:10:00 AM');
    });
  });

  describe('monthStep()', () => {
    describe('decrement a month', () => {
      const decrement = -1;
      const tests = [
        {month: 1, year: 2016, expected: {year: 2015, month: 12}},
        {month: 2, year: 2016, expected: {year: 2016, month: 1}},
        {month: 3, year: 2016, expected: {year: 2016, month: 2}},
        {month: 4, year: 2016, expected: {year: 2016, month: 3}},
        {month: 5, year: 2016, expected: {year: 2016, month: 4}},
        {month: 6, year: 2016, expected: {year: 2016, month: 5}},
        {month: 7, year: 2016, expected: {year: 2016, month: 6}},
        {month: 8, year: 2016, expected: {year: 2016, month: 7}},
        {month: 9, year: 2016, expected: {year: 2016, month: 8}},
        {month: 10, year: 2016, expected: {year: 2016, month: 9}},
        {month: 11, year: 2016, expected: {year: 2016, month: 10}},
        {month: 12, year: 2016, expected: {year: 2016, month: 11}},
      ];

      tests.forEach(function(test) {
        it(`returns ${test.expected.month} - ${test.expected.year} for ${test.month} - ${test.year} when incrementing`, () => {
          expect(ViewHelpers.monthStep(test.month, test.year, decrement)).toEqual(test.expected)
        });
      });

    });

    describe('increment a month', () => {
      const increment = 1;
      const tests = [
        {month: 1, year: 2016, expected: {year: 2016, month: 2}},
        {month: 2, year: 2016, expected: {year: 2016, month: 3}},
        {month: 3, year: 2016, expected: {year: 2016, month: 4}},
        {month: 4, year: 2016, expected: {year: 2016, month: 5}},
        {month: 5, year: 2016, expected: {year: 2016, month: 6}},
        {month: 6, year: 2016, expected: {year: 2016, month: 7}},
        {month: 7, year: 2016, expected: {year: 2016, month: 8}},
        {month: 8, year: 2016, expected: {year: 2016, month: 9}},
        {month: 9, year: 2016, expected: {year: 2016, month: 10}},
        {month: 10, year: 2016, expected: {year: 2016, month: 11}},
        {month: 11, year: 2016, expected: {year: 2016, month: 12}},
        {month: 12, year: 2016, expected: {year: 2017, month: 1}},
      ];

      tests.forEach(function(test) {
        it(`returns ${test.expected.month} - ${test.expected.year} for ${test.month} - ${test.year} when incrementing`, () => {
          expect(ViewHelpers.monthStep(test.month, test.year, increment)).toEqual(test.expected)
        });
      });
    });
  });
});
