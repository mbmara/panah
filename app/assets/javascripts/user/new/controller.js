(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("userCreateController",userCreateController)
        userCreateController.$inject=['UserFactory','$state'];

        function userCreateController( UserFactory, $state ){

        	var newuser = this;

        	newuser.types = [];

        	UserFactory.types( function(res){
        		newuser.types = res.data.payload;
        	});
        	
        	newuser.create = create;

        	function create( user ){
        		UserFactory.create(newuser.data, function(res){
        			if(res.data.status){
                        $state.go('user')
        			}else{
        				angular.forEach(res.data.payload , function(val,key){
        					alert(key+" "+val);
        				})
        			}
        		});

        	}

        }

})()