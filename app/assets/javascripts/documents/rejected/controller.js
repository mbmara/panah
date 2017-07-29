(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("rejectedDocumentController",rejectedDocumentController)
        rejectedDocumentController.$inject=['DocumentFactory'];

        function rejectedDocumentController(DocumentFactory){
        	var pendingDoc = this;
             DocumentFactory.destroy_cache();
            pendingDoc.documents = [];
        	DocumentFactory.rejected( function(res){
        		pendingDoc.documents = res.data;
        	});
            
        }

})()