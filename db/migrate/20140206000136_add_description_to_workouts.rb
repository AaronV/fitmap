class AddDescriptionToWorkouts < ActiveRecord::Migration
  def change
    change_table :workouts do |t|
      t.text :description
    end
  end
end
