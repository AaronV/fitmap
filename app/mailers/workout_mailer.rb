class WorkoutMailer < ActionMailer::Base
  default from: "noreply@fitmap.herokuapp.com"

  def workout_email(workout, update = false)
    subject = update ? "Workout updated:" : "New workout:"
    @workout = workout

    @description = ERB::Util.html_escape(@workout.description).gsub(/\n/, "\n<br/>");

    @url = root_url.chomp('/') + "#/workouts/#{workout.id}"
    mail to: @workout.participants, subject: "#{subject} #{workout.name}"
  end

end
