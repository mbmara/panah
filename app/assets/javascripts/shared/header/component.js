// register new component dashboard filter
(function(){
  angular
    .module('PANAH-APP')
    .component('panahHeader',{
        templateUrl:'shared/header/view.html',
        controller:'headerController'
      }
    )
})()
