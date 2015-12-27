// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require foundation/foundation.topbar
//= require foundation/foundation.reveal
//= require jquery.minical
//= require react_integration
//= require react_bundle

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

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
  if(!flash) return;

  if(flash.notice) {
    $(".flash-holder").append($('<div class="flash-box"></div>').html(flash.notice));
    $(".flash-box").fadeIn(400).delay(2000).fadeOut(250, function() {$(this).remove()});
  }
});

$(document).ready(function() {
  if ($(".flash-box").length){
    $(".flash-box").fadeIn(400,function(){
      $(this).delay(1000).fadeOut(250);
    });
  }

  window.onpopstate = function(e) {
    if (e.state) {
      document.title = e.state.pageTitle;
      return $('#month-view').html(e.state.html);
    }
  };
});

$(function(){$(document).foundation();});

$(document).on('click', '#hide_password', function() {
  var is_hidden = $(this).hasClass('hidden_password');
  if(is_hidden) {
    $('input[name="user[password]"]').attr('type', 'text');
    $('input[name="user[password_confirmation]"]').attr('type', 'text');
    $('input[name="user[current_password]"]').attr('type', 'text');
  } else {
    $('input[name="user[password]"]').attr('type', 'password');
    $('input[name="user[password_confirmation]"]').attr('type', 'password');
    $('input[name="user[current_password]"]').attr('type', 'password');
  }
  $(this).toggleClass('hidden_password')
});

function showOptions() {
  hideSections();
  $('.options-section').removeClass('hide');
}

function hideSections() {
  $('.options-section').addClass('hide')
  $('.sign-in-section').addClass('hide');
  $('.join-section').addClass('hide');
}

function showSignIn() {
  hideSections();
  $('.sign-in-section').removeClass('hide');
}

function showSignUp() {
  hideSections();
  $('.join-section').removeClass('hide');
}

$(document).on('click', '.option-link', function(e) {
  e.preventDefault();
  var option = $(this).data('option');
  switch(option) {
    case 'sign-in':
      showSignIn();
      break;
    case 'sign-up':
      showSignUp();
      break;
    case 'back':
      showOptions();
      break;
    default:
      return false;
    }
});

$(document).on('click', '#change-spending', function(e) {
  var month, year;
  year = $(this).prev('select').val();
  month = $(this).prev().prev('select').val();
  return window.location = "/allocation-plans/" + year + "/" + month;
});

$(document).on('click', '.item.side-item', function(e) {
  var id, offset, top;
  e.preventDefault();
  id = $(this).attr("href");
  offset = $(".tabs-content .active " + id).offset();
  top = offset.top - 5;
  return $("html, body").animate({
    scrollTop: top
  }, 850);
});
