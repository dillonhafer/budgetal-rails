class CreateAllocationPlans < ActiveRecord::Migration
  def change
    create_table :allocation_plans do |t|
      t.references :budget
      t.date       :start_date 
      t.date       :end_date 
      t.decimal    :income, precision: 10, scale: 2
      t.timestamps
    end
  end
end
