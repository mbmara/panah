class Post < ApplicationRecord
	include SearchCop

	has_many :attachments
	belongs_to :user
	#validates_presence_of  :title, :subject, :abstract, :body, :author, :case_number, :parties, :promulgation_date, :decision
	search_scope :search do
	    attributes :abstract, :title, :case_number, :author, :body
	end

	search_scope :by_year do
		attributes :promulgation_date
	end
	#search custom
	search_scope :search_custom do
		attributes :title, :author, :abstract, :tags
	end
	enum status: [:draft, :pending, :rejected, :published]

	def self.find_matches(search)

		if search!=""
  			where("title like :search OR abstract like :search", search: "%#{search}%")
  		end
	end
	def rejected
		where status: :rejected	
	end


end
