class Backup < ApplicationRecord
	establish_connection :backup
	self.table_name = "posts"
end
