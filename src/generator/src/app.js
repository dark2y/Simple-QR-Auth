'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('MyApp', ['ngRoute','monospaced.qrcode'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);