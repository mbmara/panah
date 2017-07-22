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
        
    }
})()
