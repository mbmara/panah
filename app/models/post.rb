class Post < ApplicationRecord
	validates_presence_of  :title, :subject, :abstract, :body, :author, :case_number, :parties, :promulgation_date, :decision
end
