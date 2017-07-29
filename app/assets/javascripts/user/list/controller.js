(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("userListController",userListController)
        userListController.$inject=['UserFactory','DocumentFactory'];

        function userListController(UserFactory,DocumentFactory){
        	var vm = this;
        	vm.users = [];

            DocumentFactory.destroy_cache();
        	UserFactory.all( function(res){
        		vm.users = res.data;
        	});
        	
        }

})()