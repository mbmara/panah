class ApplicationController < ActionController::Base
  	#protect_from_forgery with: :exception
    def expiration_time
      #10 minutes
      return Time.now.to_i + 3600
    end

    def init_secure_token
      _secure_hash = SecureRandom.hex(20)
      @user.session_token = _secure_hash
      @user.save
      _payload = {:id =>@user.id,:session_token=>_secure_hash,:exp=>expiration_time}
      @token = generate_secure_session _payload
    end

    def generate_secure_session payload
        return JWT.encode payload,Rails.application.secrets.secret_key_base, 'HS256'
    end

    def validate_session
      begin
        _token = request.headers['Authorization']
        if _token == 0 || _token== "0" || _token == nil
          json_response false,{Session:"Unauthorized Access"}
          return false
        end
        _c = JWT.decode _token, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }
        @user = User.find _c[0]["id"].to_i

        if !@user.present?
          json_response false,{account:"Access Denied"}
          return false
        end
        # if @user.session_token != _c[0]["session_token"]
        #   json_response false,{account:"Access Denied"}
        #   return false
        # end
        return true
      rescue JWT::ExpiredSignature
        json_response false,{Session:"Expired"}
        return false
      end
    end
  	def angular
    	render 'layouts/application'
  	end
  	
  	def json_response a,b
		render :json => {status:a,payload:b}, :status=>200
	end

	def to_md5 str

		return Digest::MD5.hexdigest(str)[0,19].upcase
	end
end
