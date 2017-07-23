(function(){
    "use strict";

    angular
        .module("PANAH-APP")
        .controller("pendingDocumentController",pendingDocumentController)
        pendingDocumentController.$inject=['DocumentFactory'];

        function pendingDocumentController(DocumentFactory){
        	var rejectDoc = this;

            rejectDoc.documents = [];
        	DocumentFactory.pending( function(res){
        		rejectDoc.documents = res.data;
        	});
            
        }

})()