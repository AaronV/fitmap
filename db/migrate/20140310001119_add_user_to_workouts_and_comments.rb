class AddUserToWorkoutsAndComments < ActiveRecord::Migration
  def change
    add_reference :workouts, :user
    add_reference :comments, :user
    remove_column :comments, :name, :string

    reversible do |dir|
      dir.up do
        Workout.all.each do |workout|
          workout.user_id = User.find(1).id;
          workout.save!
        end

        Comment.all.each do |comment|
          comment.user_id = User.find(1).id;
          comment.save!
        end
      end
    end

  end
end
