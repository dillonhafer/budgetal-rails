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
//= require jquery_nested_form
//= require_tree .

$(document).foundation();

$(document).ready(function() {
  if ($(".alert-box").length){
    $(".alert-box").hide().fadeIn(400,function(){
      $(this).delay(3000).fadeOut(250);      
    });
  }

  /* Flash to headers */
  $(document).ajaxComplete(function(event, request){
    var flash = $.parseJSON(request.getResponseHeader('X-Flash-Messages'));    
    if(!flash) return;

    if(flash.notice) { 
      $(".error").remove(); 
      $("#contentmain").before($('<div data-alert class="alert-box radius blue" style="display: none;position: fixed; top: 20px;"></div>').html(flash.notice));
      $(".alert-box.radius.blue").fadeIn(400).delay(3000).fadeOut(250, function() {$(this).remove()});
    }

    if(flash.errors) { $(".error").remove(); $("#contentmain").before($('<div class="alert-box error" style="display: none;"></div>').html(flash.errors)); $(".error").slideDown(400); } 
    $(".error").click(function() { $(this).slideUp(); });
  });
});
$(function(){ $(document).foundation(); });
