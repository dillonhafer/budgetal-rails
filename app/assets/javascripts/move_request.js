MoveRequest = (function() {
  function MoveRequest(category_id, item_id) {
    this.category_id = category_id
    this.item_id = item_id
  }

  MoveRequest.prototype.move = function() {
    $('#move_category_id').val(this.category_id)
    $('#move_item_id').val(this.item_id)
    return $('#move-item-form').submit()
  }

  return MoveRequest
})()
