class User < ApplicationRecord
	belongs_to :user_type
	has_many :post
	has_many :attachments
	validates_presence_of  :fname, :lname, :mname, :email, :password, :user_type_id
	validates_length_of :fname, :lname, :mname, :password , :maximum => 30  

	def fullname
		"#{lname.titleize} #{mname.titleize}  #{fname.titleize}"
	end
	def admin?
		(user_type_id==4)
	end
end
