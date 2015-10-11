class AddParticipantsToWorkouts < ActiveRecord::Migration
  def change
    change_table :workouts do |t|
      t.text :participants
    end
  end
end
