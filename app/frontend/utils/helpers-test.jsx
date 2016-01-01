import expect from 'expect';
import {monthName, selectedValue, numberToCurrency} from './helpers';
import {elFactory} from '../test/dom_helpers';

describe('Helpers', () => {
  describe('monthName', () => {
    var tests = [
      {args: 1,  expected: 'January'},
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
    });

    it('returns a custom symbol', () => {
      expect(numberToCurrency('24.99', '&')).toBe('&24.99');
    });

    it('adds decimal points to integers', () => {
      expect(numberToCurrency(24)).toBe('$24.00');
    });

    it('returns 0.00 if a number cannot be found', () => {
      expect(numberToCurrency('abc')).toBe('$0.00');
    });

    it('returns only a number if passed empty string', () => {
      expect(numberToCurrency('4.87', '')).toBe('4.87');
    });

    it('adds commas appropriately', () => {
      expect(numberToCurrency('1000')).toBe('$1,000.00');
    });
  });

  describe('selectedValue', () => {
    it('returns the value of a select tag by CSS selector', () => {
      var select = elFactory({tag: 'select', attributes: {class: 'month-dropdown'}});
      var months = [
        {value: 'January'},
        {value: 'March', selected: 'selected'},
        {value: 'July'}
      ];

      months.forEach(function(attributes) {
        var option = elFactory({tag: 'option', text: attributes.value, attributes});
        select.appendChild(option);
      })
      document.body.appendChild(select);

      expect(selectedValue('.month-dropdown')).toBe('March');
    });
  });
});
