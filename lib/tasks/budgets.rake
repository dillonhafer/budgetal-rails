namespace :budgets do
  desc "Create a year of template budgets"
  task :budgets => :environment do
    (1..12).each do |month|
      Budget.create(month: month, monthly_income: '3400.00')
    end
  end

  desc "Create a year of template categories and items"
  task :categories => :environment do
    Budget.all.each do |b|
      a = BudgetCategory.create(budget_id: b.id, name: 'Charity', percentage: '10-15%')
      BudgetItem.create(budget_category_id: a.id, amount_budgeted: 0.00, name: 'Tithes')

      bb = BudgetCategory.create(budget_id: b.id, name: 'Saving', percentage: '10-15%')
      BudgetItem.create(budget_category_id: bb.id, amount_budgeted: 0.00, name: 'Emergency Fund')

      c = BudgetCategory.create(budget_id: b.id, name: 'Housing', percentage: '25-35%')
      BudgetItem.create(budget_category_id: c.id, amount_budgeted: 0.00, name: 'Rent')

      d = BudgetCategory.create(budget_id: b.id, name: 'Utilities', percentage: '5-10%')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Electricity')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Gas')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Water')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Trash')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Phone')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Internet')

      e = BudgetCategory.create(budget_id: b.id, name: 'Food', percentage: '5-15%')
      BudgetItem.create(budget_category_id: e.id, amount_budgeted: 0.00, name: 'Groceries')
      BudgetItem.create(budget_category_id: e.id, amount_budgeted: 0.00, name: 'Restaurants')

      f = BudgetCategory.create(budget_id: b.id, name: 'Clothing', percentage: '2-7%')
      BudgetItem.create(budget_category_id: f.id, amount_budgeted: 0.00, name: 'Adults')
      BudgetItem.create(budget_category_id: f.id, amount_budgeted: 0.00, name: 'Cleaning/Laundry')

      g = BudgetCategory.create(budget_id: b.id, name: 'Transportation', percentage: '10-15%')
      BudgetItem.create(budget_category_id: g.id, amount_budgeted: 0.00, name: 'Gas')
      BudgetItem.create(budget_category_id: g.id, amount_budgeted: 0.00, name: 'Repairs & Tires')

      h = BudgetCategory.create(budget_id: b.id, name: 'Medical/Health', percentage: '5-10%')
      BudgetItem.create(budget_category_id: h.id, amount_budgeted: 0.00, name: 'Vitamins')

      i = BudgetCategory.create(budget_id: b.id, name: 'Insurance', percentage: '10-25%')
      BudgetItem.create(budget_category_id: i.id, amount_budgeted: 0.00, name: 'Auto')
      BudgetItem.create(budget_category_id: i.id, amount_budgeted: 0.00, name: 'Renters')

      j = BudgetCategory.create(budget_id: b.id, name: 'Personal', percentage: '5-10%')
      BudgetItem.create(budget_category_id: j.id, amount_budgeted: 0.00, name: 'Toiletries')
      BudgetItem.create(budget_category_id: j.id, amount_budgeted: 0.00, name: 'Pocket Money')

      k = BudgetCategory.create(budget_id: b.id, name: 'Recreation', percentage: '5-10%')
      BudgetItem.create(budget_category_id: k.id, amount_budgeted: 0.00, name: 'Entertainment')

      l = BudgetCategory.create(budget_id: b.id, name: 'Debts', percentage: '0%')
      BudgetItem.create(budget_category_id: l.id, amount_budgeted: 0.00, name: 'Credit Card')

    end
  end

  desc "Create a year of template budgets, categories, and items"
  task :all => [:budgets, :categories]
end
