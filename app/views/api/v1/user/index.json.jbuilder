json.array! @users do |x|
	json.extract! x, :id , :fname, :created_at, :email
	json.user_type x.user_type.name
	json.fullname x.fullname
end