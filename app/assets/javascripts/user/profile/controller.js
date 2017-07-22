(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("userProfileController",userProfileController)
        userProfileController.$inject=['UserFactory'];

        function userProfileController(UserFactory){
        	
        }

})()