'use strict';

// Declare app level module which depends on views, and components
angular.module('F1FeederApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'apiDataModule'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: "home.htm",
	  controller: "mainController"
	})
	.when('/view1',{
	  templateUrl: "view1/view1.html",
	  controller: "firstViewController"
	})
	.when('/view2',{
	  templateUrl: "view2/view2.html",
	  controller: "secondViewController"
	}).
	otherwise({
	  redirectTo: '/'
	});
}])
.controller('mainController', ['$scope', 'F1FeederService', function($scope, F1FeederService){
	$scope.home = "You are welcome to my home screen !!";
	F1FeederService.getFeederData().success(function(response){
		console.log('*** response ' + JSON.stringify(response));
	});
}])
.controller('firstViewController', ['$scope', function($scope){
	$scope.home = "You are welcome to my view 1 screen !!";
}])
.controller('secondViewController', ['$scope', function($scope){
	$scope.home = "You are welcome to my view 2 screen !!";
}]);


angular.module('apiDataModule', [])
.factory('F1FeederService', function($http){
	 var ergastAPI = {};

	    ergastAPI.getFeederData = function() {
	      return $http({
	        method: 'JSONP', 
	        url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
	      });
	    };

	    return ergastAPI;
});