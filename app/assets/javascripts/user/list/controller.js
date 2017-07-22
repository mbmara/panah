(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("userListController",userListController)
        userListController.$inject=['UserFactory'];

        function userListController(UserFactory){
        	var vm = this;
        	vm.users = [];

        	UserFactory.all( function(res){
        		vm.users = res.data;
        	});
        	
        }

})()