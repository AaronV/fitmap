class AddTypeToComments < ActiveRecord::Migration
  def change
    change_table :comments do |t|
      t.boolean :is_result, :default => false
    end
  end
end
