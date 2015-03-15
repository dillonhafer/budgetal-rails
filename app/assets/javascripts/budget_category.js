BudgetCategory = (function() {
  function BudgetCategory() {}

  BudgetCategory.budget_draggable_helper = function(e) {
    var budget_item_name = $(this).find('#budget_item_name').val()
    return $("<div class='move-modal'>Move "+budget_item_name+" to a<br>different category</div>")
  }

  BudgetCategory.move_budget_item = function(event, ui) {
    var category_id, item_id, mover
    category_id = $(this).attr('href').match(/\/budget-category\/20[0-9]{2}\/[0-9]{1,2}\/([0-9]*)/)[1]
    item_id     = ui.draggable.attr('class').match(/budget-item-form-([0-9]*)/)[1]
    mover       = new MoveRequest(category_id, item_id)
    return mover.move()
  }

  BudgetCategory.initDragAndDrop = function() {
    $('.draggable-budget-item').draggable({
      addClasses: true,
      handle: 'a.show-expenses',
      revert: 'invalid',
      tolerance: 'pointer',
      helper: BudgetCategory.budget_draggable_helper
    })

    $(".droppable-category").droppable({
      accept: ".draggable-budget-item",
      hoverClass: "active",
      drop: BudgetCategory.move_budget_item
    })
  }

  return BudgetCategory
})()

