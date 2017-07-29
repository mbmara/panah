(function(){
  angular
    .module('PANAH-APP')
    .config(['$stateProvider',applicationRoutes]);

    function applicationRoutes( $stateProvider ){
      $stateProvider
        .state('login',{
            url:'/login',
            templateUrl:'login/view.html'
        })
        .state('main.tag',{
            url:'tag/:tag',
            controllerAs:'docTag',
            controller:'tagDocController',
            templateUrl:'home/tags/view.html'
        })
        
    }
})()
