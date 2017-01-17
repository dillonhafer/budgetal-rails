class BudgetsPage < PageObject
  def on_page?
    has_selector? ".main-budget-categories", text: "You haven't added any budget items yet."
  end
end
