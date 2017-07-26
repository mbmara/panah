(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("loginAuditController",loginAuditController);

		//Dependency
		loginAuditController.$inject = ['$state','UserFactory'];

		function loginAuditController($state,UserFactory){

			var loginAudit = this;
			UserFactory.loginAudit( function(res){
				loginAudit.results = res.data;
			})
		}


})()