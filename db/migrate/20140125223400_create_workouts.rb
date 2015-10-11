class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.string :name

      t.timestamps
    end

    add_index :workouts, :name, unique: true
  end
end
