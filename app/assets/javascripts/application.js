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
//= require foundation/foundation.abide
//= require foundation/foundation.reveal
//= require jquery_nested_form
//= require_tree .

$(document).foundation({
  abide : {
    patterns : {
      password: /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    }
  }
});

$(document).ready(function() {
  if ($(".alert-box").length){
    $(".alert-box").fadeIn(400,function(){
      $(this).delay(1000).fadeOut(250);      
    });
  }

  /* Flash to headers */
  $(document).ajaxComplete(function(event, request){
    var flash = $.parseJSON(request.getResponseHeader('X-Flash-Messages'));    
    if(!flash) return;

    if(flash.notice) { 
      $(".error").remove(); 
      $("#contentmain").before($('<div data-alert class="alert-box radius blue" style="display: none;position: fixed; top: 20px;"><a class="close-reveal-modal">&#215;</a></div>').html(flash.notice));
      $(".alert-box.radius.blue").fadeIn(400).delay(1000).fadeOut(250, function() {$(this).remove()});
    }

    if(flash.errors) { $(".error").remove(); $("#contentmain").before($('<div class="alert-box error" style="display: none;"><a class="close-reveal-modal">&#215;</a></div>').html(flash.errors)); $(".error").slideDown(400); } 
    $(".error").click(function() { $(this).slideUp(); });
  });
});

$(function(){ $(document).foundation(); });

// Change month links
$(document).on('click', '#month_links div a', function() {    
  $('#month_links div a').removeClass('active');
  $(this).addClass('active');
  $('#greeting').fadeOut();    
});

// Nice scrolling for budget categories
$(document).on('click', '.quickNavLink', function(e){
    e.preventDefault();
 
    var id     = $(this).attr("href");
    var offset = $(id).offset();
 
    $("html, body").animate({
      scrollTop: offset.top-135
    }, 850);
  });    

// Controls + and - drawer for expenses  
$(document).on('click', '.show-expenses', function() {    
  $(this).parent().parent().next('.expense-list').toggleClass('hide animated fadeInUp');  
  if ($(this).text() == '+') {
    $(this).text("-");
    $(this).css('color', 'red')
  } else {
    $(this).text("+");
    $(this).css('color', '#6699FF')
  }
});

$(document).on('nested:fieldAdded', function(event){      
  var field = event.field;
  field.find('.get-date').datepicker({dateFormat: 'yy-mm-dd'})
  field.find('.show-expenses').removeClass('show-expenses').css('color', 'white');
  field.addClass('is-new');
});

$(document).on('nested:fieldRemoved', function(event){    
    var field = event.field;
    if (field.hasClass('is-new')) {
      field.remove();
    }
});

$(document).on('submit', '.edit_budget', function(e){
  e.preventDefault();
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
