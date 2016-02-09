var assert = require('assert');
var AppRoutes = require('../app/Utils/AppRoutes');

var common = require('./support/common');
const {createRenderer, React, expect, MockComponents} = common;

function setup() {
  const props = {};

  const renderer = createRenderer();
  renderer.render(<NoteEntryScreen {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer,
  };
}

describe('AppRoutes', function() {
  describe('signIn', function () {
    it('has the correct title', function() {
      assert.equal(AppRoutes.signIn.title, 'Sign In');
    });
  });
});
