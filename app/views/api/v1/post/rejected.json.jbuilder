json.array! @posts do |v|
	json.extract! v, :id,:title,:promulgation_date, :status, :author
	json.author v.user.fullname
end