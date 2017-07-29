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
                              vm.permission = res.data.permission;
                        },
                        function(){}
                  );
                  
                  vm.logout = logout;

                  function logout(){
                        window.location.href="#";
                  	UserFactory.logout();
                  }
            
		}
})()