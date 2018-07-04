'use strict';

// Declare app level module which depends on views, and components
angular.module('ekk', [
    'ngRoute',
    'ekk.home'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
    });
    $routeProvider.otherwise({redirectTo: '/'});
}]);
