class CreateAnnualBudgetItems < ActiveRecord::Migration
  def change
    create_table :annual_budget_items do |t|
      t.references :annual_budget
      t.string     :name
      t.date       :due_date
      t.boolean    :paid, null: false, default: false
      t.timestamps
    end
  end
end
