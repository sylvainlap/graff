'use strict';

var Graff = angular.module('Graff', ['ngRoute']);

Graff.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/home.html', controller: 'HomeController' })
    .when('/signin', { templateUrl: 'views/signin.html', controller: 'SigninController' })
    .otherwise({ redirectTo: '/' });

  $locationProvider.hashPrefix('!');
}]);

Graff.controller('HomeController', ['$scope', function($scope) {
  $scope.message = 'Home';
}]);

Graff.controller('SigninController', ['$scope', function($scope) {
  $scope.message = 'Signin';
}]);