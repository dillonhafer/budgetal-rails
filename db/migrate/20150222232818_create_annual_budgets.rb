class CreateAnnualBudgets < ActiveRecord::Migration
  def change
    create_table :annual_budgets do |t|
      t.references :user
      t.integer :year
      t.timestamps
    end
  end
end
