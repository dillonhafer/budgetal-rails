# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
jQuery ->
  window.onpopstate = (e) ->
     if e.state
       console.log('title: '+e.state.html)
       document.title = e.state.pageTitle
       $('#month-view').html(e.state.html)

  recent_expenses = (name) ->
    api_url       = "/past-expenses/#{name}.json"    
    expense_items = ""
    results       = ""

    jQuery.ajax
      url: api_url,
      async:false,
      success: (html) ->
        expense_items = html      
        
    for k,v of expense_items
      results += "<li class='drop-item'>#{v}</li>"

    results

  $(document).on 'blur', '.expense-item-field', () ->
    $(this).next('ul').css('left', '-9999px')

  $(document).on 'keyup', '.expense-item-field', () ->
    ul   = $(this).next('ul')
    list = recent_expenses($(this).val())    
    ul.html(list)

    if $(this).val().length > 2 && list.length      
      ul.css('left', '0')
    else
      ul.css('left', '-9999px')

  $(document).on 'mousedown', '.drop-item', () ->
    expense = $(this).text()
    $(this).parent().prev('input').val(expense)
