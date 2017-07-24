namespace :etl do
  	desc "TODO read back up and load"
  	task backup_post: :environment do

  		p "======= data migration started ========"
  		_data = Backup.all
  		p "======= #{_data.size} records found"
  		
  		_data.each do |z|

  			_m = Post.new
  			_m.user_id 		= 1
  			_m.title 		= z[:title]
  			_m.body  		= z[:body].to_s.html_safe
  			_m.abstract 	= z[:abstract].to_s.html_safe
  			_m.tags    		= z[:tags].blank? ? [] : z[:tags].split(',') 
  			_m.status 		= z[:status]
  			_m.reviewed_at	= z[:reviewed_at]
  			_m.author		= z[:author]
  			_m.promulgation_date	= z[:promulgation_date]
  			_m.case_number	= z[:case_number]
  			_m.decision	= z[:document_type]
  			_m.links	= z[:links]
  			_m.subject	= z[:subject]
  				temp = z[:parties]
  				tmp =  temp[6..-1]
  				final_name =  tmp[0..-12]
  			_m.parties	= final_name
  			p z[:tags]
  			if _m.save
  				p "---ok--"
  			else
  				p _m.errors
  			end

  		end
  	end

end


# t.string :title
# t.text :body
# t.text :abstract
# t.string :tags

# t.integer :status
# t.datetime :reviewed_at

# t.string :author
# t.string :promulgation_date
# t.string :case_number
# t.string :document_type
# t.string :decision
# t.string :links
# t.string :subject
# t.string :parties