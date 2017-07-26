class Api::V1::AuditController < ApplicationController
	before_action :validate_session, except:[]
	
	def login
		@audits = Audit.all.order id: :DESC
	end
end
