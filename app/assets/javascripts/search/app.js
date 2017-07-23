(function(){
  angular
    .module('PANAH-APP')
    .config(['$stateProvider',applicationRoutes]);

    function applicationRoutes( $stateProvider ){
      $stateProvider
        .state('search',{
            url:'/search',
            controller:'searchController',
            controllerAs:'searchDoc',
            templateUrl:'search/view.html'
        })
        
    }
})()
