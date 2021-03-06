class Api::V1::UserController < ApplicationController
	before_action :validate_session, except:[:login]
	before_action :require_admin, only:[]


	def list
		if @user.admin? || @user.is_allowed?
			@results = User.all;
		else
			json_response false,"Permission Denied"
		end
	end
	def index
		@users = User.all
	end

	def update
		_user = User.find update_params[:id]


		if _user.present?
			if @user.admin? || @user.user_type_id == _user.user_type_id
				_user.fname = update_params[:fname]
				_user.lname = update_params[:lname]
				_user.mname = update_params[:mname]
				_user.user_type_id = update_params[:user_type]

				if update_params[:password].present?
					_user.password = to_md5 update_params[:password]
				end
				if _user.save
					json_response true,"Account updated"
				else
					json_response false,_user.errors
				end
			else
				json_response false,"Permission Denied"
			end
		end
		
	end

	def authenticate
	end

	def profile	
		
		if params[:id].present? && params[:id].to_i > 0
			if @user.admin?
				@profile = User.find params[:id]
			else
				json_response false,"Invalid permission"
			end
		else
			@profile = @user
		end
	end

	def login
		user = User.find_by_email login_params[:email]
		if user.present?
			if user.password === to_md5(login_params[:password])
      			_payload = {:id =>user.id,:exp=>expiration_time}
      			_token = generate_secure_session _payload

      			user.audits.create({purpose: login_params[:purpose], status: true})
      			json_response true,{token:_token}
			else
				user.audits.create({purpose: login_params[:purpose], status: false})
				json_response false,"Invalid Account"
			end
		else
			json_response false,"Invalid Account"
		end
	end

	def create
		
		if User.find_by_email(user_params[:email]).present?
			json_response false,"User Email Address Already Exist"
			return false
		end
		if user_params[:password] != user_params[:password2]
			json_response false,"Please confirm the password correctly"
			return false
		end
		ActiveRecord::Base.transaction do
			user = User.new 
			user.fname = user_params[:fname]
			user.lname = user_params[:lname]
			user.mname = user_params[:mname]
			user.email = user_params[:email]
			user.password = to_md5 user_params[:password]
			user.user_type_id = user_params[:user_type]
			user.office_id = user_params[:office]

			if user.save
				json_response true,"ok"
			else
				json_response false,user.errors
			end
		end
	end

	def getAllTypes
		@user_types = UserType.all
		json_response true,@user_types
	end

	private 

	def update_params
		params.require(:user).permit(:id,:fname,:lname,:mname,:email,:password,:user_type)
	end
	def user_params
		params.require(:user).permit(:fname,:lname,:mname,:email,:password,:password2,:user_type,:office);
	end

	def login_params
		params.require(:user).permit(:email, :password, :purpose)
	end
end
