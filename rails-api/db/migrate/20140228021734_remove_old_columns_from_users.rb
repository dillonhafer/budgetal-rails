class RemoveOldColumnsFromUsers < ActiveRecord::Migration
  def change    
    remove_column :users, :original_email
  end  
end
