//= require jquery
//= require jquery_ujs
//= require jquery.minical
//= require react_integration
//= require react_bundle

function showMessage(message) {
  $(".flash-holder")
  var holder = document.querySelector('.flash-holder');
  var box = document.createElement('div');
  box.setAttribute('class', 'flash-box');
  box.innerHTML = message;
  holder.appendChild(box);

  $(".flash-box").fadeIn(400).delay(1700).fadeOut(250, function() { $(this).remove(); });
}

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