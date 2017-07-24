class Api::V1::PostController < ApplicationController
	before_action :validate_session, except:[:login]

	def search
		temp_data = []
		p "--- search start---"
		if !search_params[:author].blank?
			p "--- look for author since param is present---"
			author = User.find_all_by_name_containing search_params[:author]

			p author.present?
			search_params[:searchStr] || ""
			if author.present?
				p "--- author found----"
				p author.size
				author.each do |user|
					h = {}
					h[:case_number] = search_params[:case_number] if search_params[:case_number].present?
					h[:decision] = search_params[:decision] if search_params[:decision].present?
					
					if search_params[:date_from].present? && search_params[:date_to].present?
						p '----- default 2 date----'
						u = user.post.where(h).where('promulgation_date BETWEEN ? AND ?',Date.parse(search_params[:date_from]).beginning_of_day,Date.parse(search_params[:date_to]).end_of_day).search search_params[:searchStr]
					elsif search_params[:date_from].present? && !search_params[:date_to].present?
						p '----- default from----'
						u = user.post.where(h).where('promulgation_date > ?',search_params[:date_from]).search search_params[:searchStr]
					elsif !search_params[:date_from].present? && search_params[:date_to].present?
						p '----- default to----'
						u = user.post.where(h).where('promulgation_date < ?',search_params[:date_to]).search search_params[:searchStr]
					else
						p '----- default running----'
						u = user.post.where(h).search(search_params[:searchStr])
					end
					p u.size
					u.each do |tmp|
						temp_data << tmp
					end
				end
			end
		else
			p "--- look direct to docs since no author is present---"
			h = {}
			h[:case_number] = search_params[:case_number] if search_params[:case_number].present?
			h[:decision] = search_params[:decision] if search_params[:decision].present?
			
			if search_params[:date_from].present? && search_params[:date_to].present?
				p "---- both frm and to exist"
				temp_data = Post.where(h).where('promulgation_date BETWEEN ? AND ?',Date.parse(search_params[:date_from]).beginning_of_day,Date.parse(search_params[:date_to]).end_of_day).search search_params[:searchStr]
			elsif search_params[:date_from].present? && !search_params[:date_to].present?
				temp_data = Post.where(h).where('promulgation_date > ?',search_params[:date_from]).search search_params[:searchStr]
				p "---- both frm exist"
				
			elsif !search_params[:date_from].present? && search_params[:date_to].present?
				p "---- both to exist"
				temp_data = Post.where(h).where('promulgation_date < ?',search_params[:date_to]).search search_params[:searchStr]
			else
				p "---- no date exist---"
				temp_data = Post.where(h).search search_params[:searchStr]
			end
		end
		@results = temp_data
	end


	def pendingDoc
		@posts = Post.where status: :pending	
	end
	def rejected
		@posts = Post.where status: :rejected	
	end

	def approve
		if @user.admin?
			post = Post.find params[:id]
			if post.present?
				post.status = :published
				post.save
				json_response true, "Approval Success"
			else
				json_response false,"Unable to find document"
			end
			
		else
			json_response false,"Account cannot approve this document"
		end
	end
	def reject
		if @user.admin?
			post = Post.find params[:id]
			if post.present?
				post.status = :rejected
				post.save
				json_response true, "Document Rejected"
			else
				json_response false,"Unable to find document"
			end
			
		else
			json_response false,"Account cannot Reject this document"
		end
	end

	def update
		if @user.admin?
			post = Post.find update_params[:id]
		else
			post = @user.post.find update_params[:id]
		end
		if post.present?
			ActiveRecord::Base.transaction do
				post.title 			= update_params[:title]
				post.subject 		= update_params[:subject]
				post.abstract 		= update_params[:abstract].to_s.html_safe
				post.body 			= update_params[:body].to_s.html_safe
				post.author 		= update_params[:author]
				post.case_number 	= update_params[:case_number]
				post.parties 		= update_params[:parties]
				post.tags 			= update_params[:tags]
				post.links 			= update_params[:links].to_json
				post.promulgation_date = update_params[:promulgation_date]
				post.decision 		= update_params[:decision]

				attachment_arr = [];

				update_params[:attachments].each do |b|
					attachment_arr << b[:id]
				end
				
				post.attachments.each do |x|
					x.delete unless attachment_arr.include? x[:id] 
				end

				if post.save
					json_response true,post.id
				else
					json_response false,doc.errors
				end
			end
		else
			json_response false,"failed"
		end
		
	end

	def index
		p @user.admin?
		if @user.admin?
			@posts = Post.all
		else
			@posts = @user.post.all
		end
		
	end
	def delete
		Post.delete params[:id]
		json_response true,"deleted"
	end
	def show
		if @user.admin?
			#open any post
			@post = Post.find params[:id]
			@attachment = @post.attachments
		else
			#open only user post
			@post = @user.post.find params[:id]
			@attachment = @post.attachments

		end
		json_response true,{document:@post,attachments:@attachment}
	end
	def create
		ActiveRecord::Base.transaction do
			doc = @user.post.new
			doc.title 		= document_params[:title]
			doc.subject 	= document_params[:subject]
			doc.abstract 	= document_params[:abstract].to_s.html_safe
			doc.body 		= document_params[:body].to_s.html_safe
			doc.author 		= document_params[:author]
			doc.case_number = document_params[:case_number]
			doc.parties 	= document_params[:parties]
			doc.tags 		= document_params[:tags]
			doc.links 		= document_params[:links].to_json
			doc.promulgation_date = document_params[:promulgation_date]
			doc.decision 	= document_params[:decision]
			doc.status    	= @user.admin? ? :published : :pending
			if doc.save
				json_response true,doc.id
			else
				json_response false,doc.errors
			end
		end
		
	end

	def upload
		status = 200
		document_id = nil
		FileUtils.rm_rf chunk_file_directory
		if request.get?
			status = 204 unless File.exists?(chunk_file_path)
		else
			save_file!
			document_id = combine_file! if last_chunk?        
		end
		
		respond_to do |format|    
			format.json { render :json => document_id ,status: status}
		end
	end

	def get
		File.exists?(chunk_file_path) ? 200 : 204
	end

	def post!

		save_file!
		combine_file! if last_chunk?
		200
		rescue
		500
	end

	private

	def search_params
		params.require(:search).permit(:searchStr,:date_from,:date_to,:author,:case_number,:decision)
	end
	def document_params
		params.require(:document).permit(:title, :subject, :abstract, :body, :author, :case_number, :promulgation_date, :decision,parties:[],tags:[],links:[:label,:link])
	end
	def update_params
		params.require(:document).permit(:id,:title, :subject, :abstract, :body, :author, :case_number, :promulgation_date, :decision,attachments:[:id],parties:[],tags:[],links:[:label,:link])
	end

	def save_file!
		# Ensure required paths exist
		FileUtils.mkpath chunk_file_directory
			
		FileUtils.mv params['file'].tempfile, chunk_file_path, force: true
	end

	##
	# Determine if this is the last chunk based on the chunk number.
	def last_chunk?
		params[:flowChunkNumber].to_i == params[:flowTotalChunks].to_i
	end

	def chunk_file_path
		File.join(chunk_file_directory, "#{params[:flowFilename]}.part#{params[:flowChunkNumber]}")
	end

	def chunk_file_directory
		File.join "tmp", "flow", params[:flowIdentifier]
	end

	##
	# Build final file
	def combine_file!
		@datafilename = "#{Time.now.to_i}_#{params[:flowFilename]}";
		
		# Ensure required paths exist
		FileUtils.mkpath final_file_directory
		# Open final file in append mode
		File.open(final_file_path, "a") do |f|
			file_chunks.each do |file_chunk_path|
				# Write each chunk to the permanent file
				f.write File.read(file_chunk_path)
			end
		end		
		FileUtils.rm_rf chunk_file_directory
		Attachment.create({post_id:params[:post_id],user_id:@user.id,attachment:@datafilename})
	end

	def final_file_path
		File.join final_file_directory,@datafilename
	end

	##
	# /final/resting/place
	def final_file_directory
		File.join "#{Rails.root}", "public", "uploads", "file"
	end

	##
	# Get all file chunks sorted by cardinality of their part number
	def file_chunks
		Dir["#{chunk_file_directory}/*.part*"].sort_by {|f| f.split(".part")[1].to_i }
	end

	
end
