var assert = require('assert');
var ViewHelpers = require('../app/Utils/ViewHelpers');

describe('ViewHelpers', function() {
  describe('#capitalize()', function () {
    it('capitalizes words', function() {
      assert.equal(ViewHelpers.capitalize('budgetal'), 'Budgetal');
    });
  });

  describe('#dueDate()', function() {
    it('returns a local date', function() {
      assert.equal(ViewHelpers.dueDate('1-1-2015'), '1/1/2015');
    });
  });

  describe('#monthName()', function() {
    var tests = [
      {args: 0,  expected: 'Janurary'},
      {args: 6,  expected: 'July'},
      {args: 11, expected: 'December'}
    ];

    tests.forEach(function(test) {
      it('returns ' + test.expected + ' for the JS month index ' + test.args, function() {
        assert.equal(ViewHelpers.monthName(test.args), test.expected);
      });
    });

    it('returns the month name for its JS index', function() {
      assert.equal(ViewHelpers.monthName(5), 'June');
    });
  });

  describe('#numberToCurrency()', function() {
    it('returns a buck without any arguments', function() {
      assert.equal(ViewHelpers.numberToCurrency('24.99'), '$24.99');
    })

    it('returns a custom symbol', function() {
      assert.equal(ViewHelpers.numberToCurrency('24.99', '&'), '&24.99');
    })

    it('adds decimal points to integers', function() {
      assert.equal(ViewHelpers.numberToCurrency(24), '$24.00');
    })

    it('returns 0.00 if a number cannot be found', function() {
      assert.equal(ViewHelpers.numberToCurrency('abc'), '$0.00');
    })
  })
});
