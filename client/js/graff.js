'use strict';

var Graff = angular.module('Graff', ['ngResource', 'ngRoute']);

// config

Graff.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
      //resolve: TODO isSignedIn else redirect $location.path /signin
    })
    .when('/signin', {
      templateUrl: 'views/signin.html',
      controller: 'SigninController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupController'
    })
    .otherwise({ redirectTo: '/' });

  $locationProvider.hashPrefix('!');
}]);

Graff.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
    return {
      responseError: function(rejection) {
        console.log('INTERCEPTE! ' + rejection.status);
        if (rejection.status === 401) {
          $location.path('/signin');
        }
        return $q.reject(rejection);
      }
    };
  }]);
}]);

// services

Graff.factory('GraffsService', ['$resource', function($resource) {
  // TODO, le graffID n est pas par defaut ?
  return $resource('/api/graffs/:graffID', { graffID: '@graffID' }, { 'update': { method: 'PUT' } });
}]);

Graff.factory('AuthService', function() {
  var auth = {
    user: window.user
  };
  return auth;
});

// controllers

Graff.controller('HomeController', ['$scope', function($scope) {
  $scope.message = 'Home';
}]);

Graff.controller('SigninController', ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {
  $scope.auth = AuthService;

  // if user is already signed in, redirect to home
  if ($scope.auth.user) {
    $location.path('/');
  }

  $scope.signin = function() {
    $http.post('/api/signin', $scope.credentials)
      .success(function(data, status) {
        //todo $scope.auth.user = user;
        console.log('success signin!');
        console.log('data: ' + data);
        console.log('status: ' + status);
      })
      .error(function(data, status, headers, config) {
        console.log('error signin!');
        console.log('user: ' + $scope.auth.user);
        $scope.auth.user = undefined;
        $scope.error = data;
      });
  };

}]);

  Graff.controller('SignupController', ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {
  $scope.auth = AuthService;

  // if user is already signed in, redirect to home
  if ($scope.auth.user) {
    $location.path('/');
  }

  $scope.signup = function() {
    $http.post('/api/signup', $scope.credentials)
      .success(function(data, status) {
        //todo $scope.auth.user = user;
        console.log('success singup!');
        console.log('data: ' + data);
        console.log('status: ' + status);
      })
      .error(function(data, status, headers, config) {
        console.log('error signup!');
        console.log('user: ' + $scope.auth.user);
        $scope.auth.user = undefined;
        $scope.error = data;
      });
  };

}]);
