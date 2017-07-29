class Api::V1::PostController < ApplicationController
	before_action :validate_session, except:[:login]

	def homeSearch
		if search_params[:pos] == 1
			_sdata = Post.search_custom( search_params[:searchStr] )
		else
			_sdata = Post.search({body:search_params[:searchStr]})
		end
		@total = _sdata.size
		@results = @total < 10 ? _sdata : _sdata.page(search_params[:page]).per(10)
	end

	def by_year
		_sdata = Post.select(:id,:title,:case_number,:author,:promulgation_date).where('decision = ?',load_params[:doc_type]).by_year("promulgation_date:#{load_params[:year]}").order("extract(month from promulgation_date) ASC")
		
		temp={}

		temp[:left] = [
			{month:'January',data:[]},
			{month:'February',data:[]},
			{month:'March',data:[]},
			{month:'April',data:[]},
			{month:'May',data:[]},
			{month:'June',data:[]}
			]
		temp[:right] = [
			{month:'July',data:[]},
			{month:'August',data:[]},
			{month:'September',data:[]},
			{month:'October',data:[]},
			{month:'November',data:[]},
			{month:'December',data:[]}
		]
		
		_sdata.each do |d|
			tmp = d.promulgation_date.split("-")[1].to_i
			p "----#{tmp}"
			if  tmp < 7
				temp[:left][tmp-1][:data] << d
			else
				temp[:right][tmp-7][:data] << d
			end
		end
		json_response true,temp
	end

	def search
		h = {}
		if search_params[:pos] == 1
			h[:decision] = search_params[:decision] if search_params[:decision].present?
			if search_params[:date_from].present? && search_params[:date_to].present?
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],abstract:search_params[:searchStr]}).where('promulgation_date BETWEEN ? AND ?',Date.parse(search_params[:date_from]).beginning_of_day,Date.parse(search_params[:date_to]).end_of_day)
			elsif search_params[:date_from].present? && !search_params[:date_to].present?
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],abstract:search_params[:searchStr]}).where('promulgation_date > ?',search_params[:date_from])
			elsif !search_params[:date_from].present? && search_params[:date_to].present?
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],abstract:search_params[:searchStr]}).where('promulgation_date < ?',search_params[:date_to])
			else
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],abstract:search_params[:searchStr]})
			end
		else
			h[:decision] = search_params[:decision] if search_params[:decision].present?
			if search_params[:date_from].present? && search_params[:date_to].present?
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],body:search_params[:searchStr]}).where('promulgation_date BETWEEN ? AND ?',Date.parse(search_params[:date_from]).beginning_of_day,Date.parse(search_params[:date_to]).end_of_day)
			elsif search_params[:date_from].present? && !search_params[:date_to].present?
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],body:search_params[:searchStr]}).where('promulgation_date > ?',search_params[:date_from])
			elsif !search_params[:date_from].present? && search_params[:date_to].present?
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],body:search_params[:searchStr]}).where('promulgation_date < ?',search_params[:date_to])
			else
				_sdata = Post.where(h).search({case_number: search_params[:case_number], author: search_params[:author],body:search_params[:searchStr]})
			end
		end
		@total = _sdata.size
		@results = @total < 10 ? _sdata : _sdata.page(search_params[:page]).per(10)
	end

	def pendingDoc
		if @user.admin? || @user.is_allowed?
			@posts = Post.where status: :pending
		end	
	end

	def rejected
		if @user.admin? || @user.is_allowed?
			@posts = Post.where status: :rejected	
		end
	end

	def approve
		if @user.admin? || @user.is_allowed?
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
		if @user.admin? || @user.is_allowed?
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
		if @user.admin? || @user.is_allowed?
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
		if @user.admin? || @user.is_allowed?
			_sdata = Post.all
			p _sdata.size
		else
			_sdata = @user.post.all
		end
		@total = _sdata.size
		@results = @total < 10 ? _sdata : _sdata.page(params[:page]).per(10)
	end
	def delete
		Post.delete params[:id]
		json_response true,"deleted"
	end
	def show
		if @user.admin? || @user.is_allowed?
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

	def load_params
		params.require(:year).permit(:year,:doc_type,:page)
	end
	def search_params
		params.require(:search).permit(:searchStr,:date_from,:date_to,:author,:case_number,:decision, :page, :pos)
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
