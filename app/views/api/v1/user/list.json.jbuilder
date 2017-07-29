json.array! @results do |x|
	json.extract! x, :id, :fullname unless x.user_type_id === @user.user_type_id
end