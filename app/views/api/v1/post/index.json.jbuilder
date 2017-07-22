json.array! @posts do |v|
	json.extract! v, :id,:title,:promulgation_date
end