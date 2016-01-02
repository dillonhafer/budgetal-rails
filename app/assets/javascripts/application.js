//= require jquery
//= require jquery_ujs
//= require jquery.minical
//= require react_integration
//= require react_bundle

$(document).on('focus', '.get-date', function(e) {
  $(this).minical({
    date_changed: function() {
      var event = new Event('input', { bubbles: true })
      e.target.dispatchEvent(event)
    }
  })
});