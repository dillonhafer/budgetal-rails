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
//= require foundation/foundation.reveal
//= require jquery-ui.min
//= require jquery_nested_form
//= require react
//= require react_ujs
//= require lodash
//= require components
//= require class-set
//= require picker
//= require picker.date
//= require_tree .

function numberToCurrency(number, dollarSign) {
  if (dollarSign === undefined) {
    dollarSign = '$'
  }
  if (isNaN(parseFloat(number))) {
    number = 0
  }
  return dollarSign + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).foundation()

var AnnualBudgetItemController = {
  all(data) {
    return $.ajax({
              url: '/annual-budgets',
              dataType: 'json',
              data: data
            })
  },
  create(budget_item) {
    return $.ajax({
              url: '/annual-budget-items',
              dataType: 'json',
              method: 'POST',
              data: budget_item
            })
  },
  update(data) {
    return $.ajax({
              url: '/annual-budget-items/' + data.annual_budget_item.id,
              dataType: 'json',
              method: 'PUT',
              data: data
            })
  },
  destroy(budget_item) {
    return $.ajax({
              url: '/annual-budget-items/'+budget_item.id,
              dataType: 'json',
              method: 'DELETE'
            })
  }
}

function showMessage(message) {
  $(".flash-holder").append($('<div class="flash-box"></div>').html(message));
  $(".flash-box").fadeIn(400).delay(2000).fadeOut(250, function() {$(this).remove()});
}

$(document).on('focus', '.get-date', function(e) {
  $(this).pickadate({
    format: 'yyyy-mm-dd',
    onSet: function() {
      var event = new Event('input', { bubbles: true })
      this.$node[0].dispatchEvent(event)
    }
  })
})

$(document).ready(function() {
  if ($(".flash-box").length){
    $(".flash-box").fadeIn(400,function(){
      $(this).delay(1000).fadeOut(250);
    });
  }

  /* Flash to headers */
  $(document).ajaxComplete(function(event, request){
    var flash = $.parseJSON(request.getResponseHeader('X-Flash-Messages'));
    if(!flash) return;

    if(flash.notice) {
      $(".flash-holder").append($('<div class="flash-box"></div>').html(flash.notice));
      $(".flash-box").fadeIn(400).delay(2000).fadeOut(250, function() {$(this).remove()});
    }
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

$(document).on('click', 'a.copy-category', function(e) {
  e.preventDefault()
  $('#copy-modal').foundation('reveal','open')
})

$(document).on('click', 'a.delete-budget-item', function(e) {
  e.preventDefault()
  var delete_href = $(this).data('link')
  var item_name   = $(this).data('name')
  $('#delete-modal').foundation('reveal','open')
  $('#delete-modal .delete-confirm').attr('href', delete_href)
  $('#delete-modal .name').html(item_name)
})
