$(document).ready ->
  BudgetCategory.initDragAndDrop()

jQuery ->
  window.onpopstate = (e) ->
     if e.state
       document.title = e.state.pageTitle
       $('#month-view').html(e.state.html)