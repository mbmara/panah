(function(){
	"use strict";

	angular
		.module("PANAH-APP")
		.controller("homeController",homeController);

		//Dependency
		homeController.$inject = ['userInit','HomeFactory','DocumentFactory','$state'];

		function homeController(userInit, HomeFactory,DocumentFactory, $state){
			var home = this;
			
			home.search = true;
			home.s={
				page:1,
				pos:1
			}
			var obj = {
					page:1
				}

			home.tab = function(tb){
				home.s.pos = tb;
				home.goSearch(home.s);	
			}
			home.loadByYear = function(year,doc_type){
				home.search = false;
				obj.year = year;
				obj.doc_type = doc_type;
				DocumentFactory.byYear(obj, function(res){
					home.data.left = res.data.payload.left;
					home.data.right = res.data.payload.right;
				})
			}
			HomeFactory.init( function(res){
				home.data = res.data.payload;
			});
			home.load_page = function(p){
				if(home.search){
					home.s.page = p;
					home.goSearch(home.s);	
				}else{
					obj.page = p;
					home.loadByYear(obj.year,obj.doc_type);
				}
			}
			home.goSearch = function(searchStr){
				home.search = true;
				DocumentFactory.home_search(searchStr, function(res){
					home.data.results = res.data.results;
					home.total = res.data.total;

				});
			}
			
		}


})()