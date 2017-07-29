(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("userProfileController",userProfileController)
        userProfileController.$inject=['UserFactory','$state','DocumentFactory'];

        function userProfileController(UserFactory, $state,DocumentFactory){
        	var profile = this;
            var id = ($state.params.id) ? $state.params.id : 0;
            
             DocumentFactory.destroy_cache();
        	UserFactory.profile( id,function(res){
        		profile.data = res.data;
        	});

            profile.update = function(){
                UserFactory.updateProfile(profile.data, function(res){
                   alert(res.data.payload);
                });
            }
        }

})()