json.results @results do |v|
	json.extract! v, :title, :id, :status, :promulgation_date, :abstract, :author
	json.tags JSON(v.tags) || []
end
json.total @total