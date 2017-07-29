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
            DocumentFactory.destroy_home_search();
           	searchDoc.decisions = [
                {value:'decision', label:'Decision'},
                {value:'opinion', label:'Opinion'}
            ];
            if(DocumentFactory.search_cache2){
              searchDoc.result = DocumentFactory.search_cache2.results;
              searchDoc.total = DocumentFactory.search_cache2.total;
              searchDoc.data = DocumentFactory.search_cache_data;
            }
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
                DocumentFactory.search_cache2 = res.data;
                DocumentFactory.search_cache_data = searchDoc.data;
            		searchDoc.result = res.data.results;	
                searchDoc.total  = res.data.total;
            	})
            }
		}
})()