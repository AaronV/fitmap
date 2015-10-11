json.array!(@workouts) do |workout|
  json.extract! workout, :id, :user, :name, :created_at, :description, :participants
  json.url workout_url(workout, format: :json)
end
