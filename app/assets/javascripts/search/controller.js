(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("searchController",searchController);

		//Dependency
		searchController.$inject = ['DocumentFactory'];


		function searchController(DocumentFactory){
           	var searchDoc = this;

           	searchDoc.data={
           	  page:1,
              pos:1
           	}
            
           	searchDoc.decisions = [
                {value:'decision', label:'Decision'},
                {value:'opinion', label:'Opinion'}
            ];

            searchDoc.tab = function(id){
              searchDoc.data.pos = id;
              searchDoc.search();
            }
           	searchDoc.searchWindow = true;
           	searchDoc.toggle = function(){
           		searchDoc.searchWindow = !searchDoc.searchWindow;
           	};
            
            searchDoc.load_page = function(p){
              searchDoc.data.page = p;
              searchDoc.search();  
            }
            searchDoc.search = function(){
            	DocumentFactory.search(searchDoc.data, function(res){
            		searchDoc.result = res.data.results;	
                searchDoc.total  = res.data.total;
            	})
            }
		}
})()