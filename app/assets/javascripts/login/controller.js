(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("loginController",loginController)
        loginController.$inject=['UserFactory','Server'];

        function loginController( UserFactory, Server){
        	var vm = this;
        	vm.data = {
        		email:'tearhear18@gmail.com',
        		password:'123123'
        	};
        	vm.login = login;

        	function login(user){
        		UserFactory.login(user, function(res){
        			Server.setToken(res.data.payload);
        			location.reload();
        		})
        	}
            
        }

})()