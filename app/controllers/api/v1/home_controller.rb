class Api::V1::HomeController < ApplicationController
	before_action :validate_session, except:[:login]
  	def index
  		if @user.admin?
	  		@users_count 	= User.count
	  		@pending_docs 	= Post.where(status: :pending).count
	  	else
	  		@users_count    = @user.post.count
	  		@pending_docs   = @user.post.where(status: :pending).count
	  	end
	  	@total_docs 	= Post.count
	  	@latest_docs 	= Post.where('created_at BETWEEN ? AND ?',Date.today.beginning_of_day, Date.today.end_of_day).count
		@admin 			= @user.admin?
	  	@decision_year 	= Post.where(decision: :decision).group("year(promulgation_date)").order("year(promulgation_date) DESC").count :id
	  	@opinion_year 	= Post.where(decision: :opinion).group("year(promulgation_date)").order("year(promulgation_date) DESC").count :id
	  	json_response true,{
	  		admin:@admin,
	  		user:@users_count,
	  		total_docs:@total_docs,
	  		pending_docs: @pending_docs,
	  		latest_docs: @latest_docs,
	  		decision_year: @decision_year,
	  		opinion_year: @opinion_year
	  	}

  	end
end


#2013
#2012
#2017

