class CreateBudgets < ActiveRecord::Migration
  def change
    create_table :budgets do |t|
      t.string :month
      t.decimal :monthly_income, :precision => 10, :scale => 2
      t.timestamps
    end
  end
end
