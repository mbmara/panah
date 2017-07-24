'use strict';

/** just a comment **/
angular.module('PANAH-APP',[
	'ui.router',
	'templates',
	'ui.tinymce',
	'flow', 
	'ngStorage',
    'cgNotify',
    '720kb.datepicker',
])
	.config(['$stateProvider','$urlRouterProvider','$locationProvider', router])
	.filter('htmlToPlaintext', function() {
    	return function(text) {
      		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    	};
  	});
	function router($stateProvider, $urlRouterProvider, $locationProvider){
		$locationProvider.html5Mode(false).hashPrefix('');
    	$urlRouterProvider.otherwise('/');

	    $stateProvider
	    	.state("main",{
	          	url:"/",
	          	controller:'homeController',
	       		templateUrl:"home/view.html",
	       		controllerAs:'home',
	       		resolve:{
	       			userInit: ['UserFactory', function(UserFactory){
	       				return UserFactory.authenticate();
	       			}]
	       		}
	    	})
	}


