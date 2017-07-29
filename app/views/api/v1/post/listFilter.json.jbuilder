json.results @results do |v|
	json.extract! v, :title, :id, :status, :promulgation_date, :abstract, :author
end
json.total @total