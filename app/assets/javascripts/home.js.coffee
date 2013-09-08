# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
jQuery ->
  window.onpopstate = (e) ->
     if e.state
       console.log('title: '+e.state.html)
       document.title = e.state.pageTitle
       $('#month-view').html(e.state.html)