(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("sidenavController",sidenavController);

		//Dependency
		sidenavController.$inject = ['UserFactory'];


		function sidenavController(UserFactory){
                  var vm = this;

            	UserFactory.authenticate().then(
                        function(res){
                              vm.isAdmin = res.data.admin;
                        },
                        function(){}
                  );
                  
                  vm.logout = logout;

                  function logout(){
                  	UserFactory.logout();
                  }
            
		}
})()