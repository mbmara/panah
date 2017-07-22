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
				showdoc.document = res.data.payload;
				showdoc.document.parties = JSON.parse(res.data.payload.parties)
				showdoc.document.tags = JSON.parse(res.data.payload.tags)
			})
		}


})()