class Post < ApplicationRecord
	has_many :attachments
	belongs_to :user
	#validates_presence_of  :title, :subject, :abstract, :body, :author, :case_number, :parties, :promulgation_date, :decision
	
	enum status: [:draft, :pending, :rejected, :published]

	def self.find_matches(search)

		if search!=""
  			where("title like :search OR abstract like :search", search: "%#{search}%")
  		end
	end
	def rejected
		where status: :rejected	
	end

	def self.search(str)
		p str.blank?
		if !str.blank?
			value = Array.new
			search_length = str.split.length
			str.split.each do |c|
				value.push("%#{c}%","%#{c}%")
			end
			where [(['title like ? OR abstract like ?'] * search_length).join(' AND ')] + 	value
		else
			where("id > 0")
		end
# 

	end

end
