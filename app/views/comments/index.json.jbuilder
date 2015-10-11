json.array!(@comments) do |comment|
  json.extract! comment, :id, :user, :body, :is_result
  json.url workout_comments_url(comment, format: :json)
end
