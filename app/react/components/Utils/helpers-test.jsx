import expect from 'expect';
import {monthName, selectedValue, numberToCurrency} from './helpers';

describe('Helpers', () => {
  describe('monthName', () => {
    var tests = [
      {args: 1,  expected: 'Janurary'},
      {args: 7,  expected: 'July'},
      {args: 12, expected: 'December'}
    ];

    tests.forEach(function(test) {
      it(`returns ${test.expected} for the month index ${test.args}`, ()=> {
        expect(monthName(test.args)).toBe(test.expected);
      });
    });

    it('returns the month name (June) for its JS index (5)', () => {
      expect(monthName(6)).toBe('June');
    });
  });

  describe('numberToCurrency', () => {
    it('returns a buck without any arguments', () => {
      expect(numberToCurrency('24.99')).toBe('$24.99');
    })

    it('returns a custom symbol', () => {
      expect(numberToCurrency('24.99', '&')).toBe('&24.99');
    })

    it('adds decimal points to integers', () => {
      expect(numberToCurrency(24)).toBe('$24.00');
    })

    it('returns 0.00 if a number cannot be found', () => {
      expect(numberToCurrency('abc')).toBe('$0.00');
    })
  })
});
