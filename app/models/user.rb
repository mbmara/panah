class User < ApplicationRecord
	belongs_to :user_type
	has_many :post
	has_many :audits
	has_many :attachments
	validates_presence_of  :fname, :lname, :mname, :email, :password, :user_type_id
	validates_length_of :fname, :lname, :mname, :password , :maximum => 30  

	
	def fullname
		"#{lname.titleize} #{mname.titleize}  #{fname.titleize}"
	end
	def shortname
		"#{lname[0]}#{fname[0]}"
	end
	def admin?
		(user_type_id==4 || user_type_id == 3)
	end
	def is_allowed?
		(user_type_id==3)
	end
	def self.find_all_by_name_containing(search)
		# _names = search.split(" ")
  # 		where("fname like :search OR lname like :search", search: "%#{_names[0]}%")
		# .where("fname like :search OR lname like :search", search: "%#{_names[1]}%")

		search_length = search.split.length
			where [(['fname like ? OR mname like ? OR lname like ?'] * search_length).join(' AND ')] + search.split.map { |name| "%#{name}%"} + search.split.map { |name| "%#{name}%"} + search.split.map { |name| "%#{name}%"}
	end
end
