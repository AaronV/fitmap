class RemoveNameIndexFromWorkouts < ActiveRecord::Migration
  def change
    remove_index :workouts, :name => 'index_workouts_on_name'
  end
end
