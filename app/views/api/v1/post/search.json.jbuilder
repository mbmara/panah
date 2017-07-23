json.array! @results do |v|
	json.extract! v, :title, :id, :status, :promulgation_date
end