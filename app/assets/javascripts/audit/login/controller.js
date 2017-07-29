(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("loginAuditController",loginAuditController);

		//Dependency
		loginAuditController.$inject = ['$state','UserFactory','DocumentFactory'];

		function loginAuditController($state,UserFactory,DocumentFactory){
			DocumentFactory.destroy_cache();
			var loginAudit = this;
			UserFactory.loginAudit( function(res){
				loginAudit.results = res.data;
			})
		}


})()