// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery.min
//= require jquery_ujs
//= require foundation
//= require raphael-min
//= require_tree .

$(document).ready(function() {
  if ($(".alert-box").length){
    $(".alert-box").hide().slideDown(400,function(){
      $(this).delay(3000).slideUp(250);
    });
  }
  $(document).foundationAccordion();
  
  $("#loading").hide();  

  /* Flash to headers */
  $(document).ajaxComplete(function(event, request){
    var flash = $.parseJSON(request.getResponseHeader('X-Flash-Messages'));    
    if(!flash) return;
    if(flash.notice) { console.log(flash.notice+'fil'); $(".error").remove(); $("#contentmain").before($('<div class="alert-box success" style="display: none;"></div>').html("dillon"+flash.notice)); $(".success").slideDown(400).delay(3000).slideUp(250); $.getScript(window.location); }
    if(flash.errors) { $(".error").remove(); $("#contentmain").before($('<div class="alert-box error" style="display: none;"></div>').html(flash.errors)); $(".error").slideDown(400); } 
    $(".error").click(function() { $(this).slideUp(); });
  });
});