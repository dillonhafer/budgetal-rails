$(document).on 'click', '#change-spending', (e) ->
  year  = $(this).prev('select').val()
  month = $(this).prev().prev('select').val()
  window.location = "/allocation-plans/#{year}/#{month}"

$(document).on 'click', '.item.side-item', (e) ->
  e.preventDefault() 
  id     = $(this).attr("href")  
  offset = $(".tabs-content .active #{id}").offset()
  top    = offset.top - 5
  $("html, body").animate({scrollTop: top}, 850)