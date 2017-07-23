(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("showDocumentController",showDocumentController);

		//Dependency
		showDocumentController.$inject = ['$state','DocumentFactory'];

		function showDocumentController($state,DocumentFactory){

			var showdoc = this;
			var id = $state.params.id;

			DocumentFactory.show(id , function(res){
				showdoc.document = res.data.payload.document;
				showdoc.document.parties = JSON.parse(res.data.payload.document.parties);
				showdoc.document.tags = JSON.parse(res.data.payload.document.tags);
				showdoc.document.links = JSON.parse(res.data.payload.document.links);
				showdoc.document.attachments = res.data.payload.attachments;
			});
		}


})()