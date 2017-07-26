json.array! @audits do |c|
	json.extract! c, :id, :purpose, :created_at, :status
	json.name c.user.fullname
end