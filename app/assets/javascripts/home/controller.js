(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("homeController",homeController);

		//Dependency
		homeController.$inject = ['userInit','HomeFactory','DocumentFactory'];

		function homeController(userInit, HomeFactory,DocumentFactory){
			var home = this,search = true;
			home.s={
				page:1
			}
			var obj = {
					page:1
				}
			home.loadByYear = function(year,doc_type){
				search = false;
				obj.year = year;
				obj.doc_type = doc_type;
				DocumentFactory.byYear(obj, function(res){
					home.data.results = res.data.results;
					home.total = res.data.total;
				})
			}
			HomeFactory.init( function(res){
				home.data = res.data.payload;
			});
			home.load_page = function(p){
				if(search){
					home.s.page = p;
					home.goSearch(home.s);	
				}else{
					obj.page = p;
					home.loadByYear(obj.year,obj.doc_type);
				}
			}
			home.goSearch = function(searchStr){
				search = true;
				DocumentFactory.home_search(searchStr, function(res){
					home.data.results = res.data.results;
					home.total = res.data.total;

				});
			}
			
		}


})()