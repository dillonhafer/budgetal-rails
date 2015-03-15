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
//= require foundation/foundation.offcanvas
//= require foundation/foundation.topbar
//= require foundation/foundation.tab
//= require foundation/foundation.abide
//= require foundation/foundation.reveal
//= require jquery_nested_form
//= require jquery-ui.min
//= require_tree .

$(document).foundation({
  abide : {
    patterns : {
      password: /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    }
  }
});

$(document).ready(function() {
  if ($(".flash-box").length){
    $(".flash-box").fadeIn(400,function(){
      $(this).delay(1000).fadeOut(250);
    });
  }

  $('.get-date').datepicker({dateFormat: 'yy-mm-dd'})

  /* Flash to headers */
  $(document).ajaxComplete(function(event, request){
    var flash = $.parseJSON(request.getResponseHeader('X-Flash-Messages'));
    if(!flash) return;

    if(flash.notice) {
      $(".error").remove();
      $(".flash-holder").append($('<div class="flash-box"></div>').html(flash.notice));
      $(".flash-box").fadeIn(400).delay(2000).fadeOut(250, function() {$(this).remove()});
    }

    if(flash.errors) { $(".error").remove(); $(".category-ajax").before($('<div class="alert-box error" style="display: none;"><a class="close-reveal-modal">&#215;</a></div>').html(flash.errors)); $(".error").slideDown(400); }
    $(".error").click(function() { $(this).slideUp(); });
  });
});

$(function(){ $(document).foundation(); });

$(document).on('click', 'a.item', function(e){
  $('a.item.active').removeClass('active');
  $('span.tooltip.active').removeClass('active');
  $(this).addClass('active');
  $(this).next('span.tooltip').addClass('active');
});

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

$(document).on('click', '.category-ajax', function(e) {
  if ($('span.tooltip').hasClass('active')) {
    $('span.tooltip').removeClass('active')
  }
});

$(document).on('click', '.main-annual-budget', function(e) {
  //e.preventDefault()
  if ($('span.tooltip').hasClass('active')) {
    $('.change-anual-budget').click()
  }
})

$(document).on('change', '#year_change_annual_budget_1i', function() {
  path = '/annual-budgets/' + $(this).val()
  document.location.href = path
})

$(document).on('click', '.change-anual-budget', function(e) {
  e.preventDefault()
  $('.annual-budget-tooltip').fadeToggle()
  $('.annual-budget-tooltip').toggleClass('active')
})

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
  console.log(option);
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

$(document).on('click', '.remove-new-item', function(e) {
  e.preventDefault()
  $('.budget-item-form-new').fadeOut().delay(500).remove()
})

$(document).on('click', 'a.copy-category', function() {
  $('#copy-modal').foundation('reveal','open');
});
