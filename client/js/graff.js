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
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController'
    })
    .when('/graffs', {
      templateUrl: 'views/graffs.html',
      controller: 'GraffsController'
    })
    .when('/newGraff', {
      templateUrl: 'views/newGraff.html',
      controller: 'NewGraffController'
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
        	// TODO, vérifier si on redirige vers SignIn depuis les graffs, le $scope.error est affiché ?
          $location.path('/signin');
        }
        return $q.reject(rejection);
      }
    };
  }]);
}]);

// services

/*Graff.factory('GraffsService', ['$resource', function($resource) {
  // TODO, le graffID n est pas par defaut ?
  return $resource('/api/graffs/:graffID', { graffID: '@graffID' }, { 'update': { method: 'PUT' } });
}]);*/

Graff.factory('AuthService', ['$window', function($window) {
  var auth = {
    user: $window.user
  };
  console.log('je suis dans la factory !!!');
  return auth;
}]);

// controllers

Graff.controller('HomeController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
  $scope.auth = AuthService;
  if ($scope.auth.user) {
    $location.path('/graffs');
  }
}]);

Graff.controller('SigninController', ['$scope', '$location', '$http', 'AuthService', function($scope, $location, $http, AuthService) {
  $scope.auth = AuthService;

  // if user is already signed in, redirect to home
  if ($scope.auth.user) {
    $location.path('/');
  }

  $scope.signin = function() {
    $http.post('/api/signin', $scope.credentials)
      .success(function(data, status) {
        $scope.auth.user = data;
        $location.path('/');
      })
      .error(function(data, status) {
        $scope.user = undefined;
        $scope.error = data;
      });
  };

}]);

Graff.controller('SignupController', ['$scope', '$location', '$http', 'AuthService', function($scope, $location, $http, AuthService) {
  $scope.user = AuthService.user;

  // if user is already signed in, redirect to home
  if ($scope.user) {
    $location.path('/');
  }

  $scope.signup = function() {
    $http.post('/api/signup', $scope.credentials)
      .success(function(data, status) {
        $scope.auth.user = data;
        $location.path('/');
      })
      .error(function(data, status, headers, config) {
        $scope.user = undefined;
        $scope.error = data;
      });
  };

}]);

Graff.controller('HeaderController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
  $scope.auth = AuthService;
}]);

Graff.controller('ProfileController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
  $scope.auth = AuthService;
  if (!$scope.auth.user) {
    $location.path('/signin');
  }

}]);

Graff.controller('NewGraffController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
  $scope.auth = AuthService;
  if (!$scope.auth.user) {
    $location.path('/signin');
  }

  // TODO: les fonctions pour poster un graff


}]);

Graff.controller('GraffsController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
  $scope.auth = AuthService;
  if (!$scope.auth.user) {
    $location.path('/signin');
  }

  // TODO: les fonctions pour afficher les graffs


}]);
