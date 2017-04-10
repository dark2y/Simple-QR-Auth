'use strict';

///Angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('MyGeneratorApp', ['monospaced.qrcode','angularScreenfull']).run(function($rootScope) {
  
});

if(typeof SETTINGS !== "undefined")
  app.constant("SETTINGS", SETTINGS);