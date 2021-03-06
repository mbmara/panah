(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("headerController",headerController);

		//Dependency
		headerController.$inject = ['UserFactory'];


		function headerController(UserFactory){
                  var vm = this;

            	UserFactory.authenticate().then(
                        function(res){
                              vm.name = res.data.name;
                              vm.role = res.data.role;
                              vm.date = res.data.date;
                              vm.shortname = res.data.shortname;
                        },
                        function(){}
                  );
                  
                  vm.logout = logout;

                  function logout(){
                  	UserFactory.logout();
                  }
            
		}
})()