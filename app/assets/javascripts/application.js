//= require jquery
//= require jquery_ujs
//= require foundation
//= require foundation/foundation.topbar
//= require foundation/foundation.reveal
//= require jquery.minical
//= require react_integration
//= require react_bundle

function showMessage(message) {
  $(".flash-holder").append($('<div class="flash-box"></div>').html(message));
  $(".flash-box").fadeIn(400).delay(1700).fadeOut(250, function() {$(this).remove()});
}

$(document).on('focus', '.get-date', function(e) {
  $(this).minical({
    date_changed: function() {
      var event = new Event('input', { bubbles: true })
      e.target.dispatchEvent(event)
    }
  })
});

$(document).ajaxComplete(function(event, request){
  var flash = $.parseJSON(request.getResponseHeader('X-Flash-Messages'));
  if (!!flash.notice) {
    showMessage(flash.notice);
  }
});

$(document).ready(function() {
  var message = $(".flash-box").html()
  if (!!message) {
    $(".flash-box").remove();
    showMessage(message);
  }
});

$(function(){$(document).foundation();});