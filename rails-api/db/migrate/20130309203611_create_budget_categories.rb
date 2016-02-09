class CreateBudgetCategories < ActiveRecord::Migration
  def change
    create_table :budget_categories do |t|
      t.references :budget
      t.string :name
      t.string :percentage
      t.timestamps
    end
  end
end
