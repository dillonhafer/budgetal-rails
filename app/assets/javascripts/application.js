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

$(document).on('click', '.sign-in-close', function() {
  $('#signInUp').removeClass('fadeIn');
  $('#signInUp').addClass('hide');
});

$(document).on('click', '.sign-in', function() {
  $('#signInUp').addClass('fadeIn');
  $('#signInUp').removeClass('hide');
});