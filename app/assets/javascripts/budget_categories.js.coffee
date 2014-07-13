# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(document).on 'click', '#change-budget', (e) ->
  year  = $(this).prev('select').val()
  month = $(this).prev().prev('select').val()
  window.location = "/cash-flow-plans/#{year}/#{month}"

$(document).on 'submit', '.edit_budget', (e) ->
  e.preventDefault()

$(document).on 'nested:fieldAdded', (event) ->
  field = event.field
  field.find('.get-date').datepicker({dateFormat: 'yy-mm-dd'})
  field.find('.show-expenses').removeClass('show-expenses').css('color', 'white')
  field.addClass('is-new')

$(document).on 'nested:fieldRemoved', (event) ->
  field = event.field
  if field.hasClass('is-new')
    field.remove()

$(document).on 'click', '.show-expenses', (e) ->    
  $(this).parent().parent().next('.expense-list').toggleClass('hide animated fadeIn')
  i = $(this).find('i')

  if i.hasClass('fi-arrows-expand')
    i.removeClass('fi-arrows-expand').addClass('fi-arrows-compress');
    i.css('color', 'red')
  else
    i.removeClass('fi-arrows-compress').addClass('fi-arrows-expand');    
    i.css('color', '#6699FF')

jQuery ->
  window.onpopstate = (e) ->
     if e.state       
       document.title = e.state.pageTitle
       $('#month-view').html(e.state.html)

  recent_expenses = (ul, name, top) ->
    api_url       = "/past-expenses/#{name}.json"    
    expense_items = ""
    results       = ""

    jQuery.ajax
      url: api_url,
      async:true,
      success: (html) ->
        expense_items = html              
        for k,v of expense_items
          results += "<li class='drop-item'>#{v}</li>"
        
        if results.length
          ul.html(results)
          ul.css('left', '37%')
          ul.css('top', top-100)
          ul.addClass('active-recent-expenses')
        else
          ul.css('left', '-9999px')
          ul.removeClass('active-recent-expenses')

  $(document).on 'blur', '.expense-item-field', () ->
    ul = $(this).parent().parent().parent().parent().next('ul')
    ul.css('left', '-9999px')

  $(document).on 'keydown', '.expense-item-field', (event) ->
    ul = $(this).parent().parent().parent().parent().next('ul')
    if event.keyCode == 13
      event.preventDefault()      
      if ul.find('li.active-li').length
        ul.find('li.active-li').trigger('mousedown')
      else        
        ul.find('li:first-child').trigger('mousedown')

      ul.css('left', '-9999px')
      ul.removeClass('active-recent-expenses')      

  $(document).on 'keyup', '.expense-item-field', (event) ->
    $('input.active-input').removeClass('active-input')
    $(this).addClass('active-input')
    ul = $(this).parent().parent().parent().parent().next('ul')
    top = $(this).offset().top
    if $.inArray(event.keyCode, [13, 37, 38, 39, 40]) > -1
      if event.keyCode == 40
        if ul.find('.active-li').length
          existing = ul.find('.active-li')          
          if $(existing).index() == ul.find('li').last().index()
            ul.find('li').first().addClass('active-li')
          else
            $(existing).next('li').addClass('active-li')
          
          $(existing).removeClass('active-li')
        else
          ul.find('li').first().addClass('active-li')
      else if event.keyCode == 38
        if ul.find('.active-li').length
          existing = ul.find('.active-li')          
          if $(existing).index() == ul.find('li').first().index()
            ul.find('li').last().addClass('active-li')
          else
            $(existing).prev('li').addClass('active-li')
          
          $(existing).removeClass('active-li')
        else
          ul.find('li').last().addClass('active-li')
      else if event.keyCode == 39        
        event.preventDefault()
        ul.find('li.active-li').trigger('mousedown')
        ul.css('left', '-9999px')
        ul.removeClass('active-recent-expenses')      
    else
      if $(this).val().length > 1
        recent_expenses(ul, $(this).val(), top)        
      else
        ul.css('left', '-9999px')
        ul.removeClass('active-recent-expenses')

  $(document).on 'mousedown', '.drop-item', () ->
    expense = $(this).text()
    $('input.active-input').val(expense).removeClass('active-input')

