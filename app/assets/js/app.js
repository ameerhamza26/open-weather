var modules = ['ngMaterial', 'ui.router', 'WeatherApp.Controllers', 'CoreApi', 'WeatherApp.services'];

var WeatherApp = angular.module('WeatherApp', modules)

WeatherApp.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('app', {
            abstract: true,
            url: "",
            template: '<div ui-view="access"></div>',
        })
        .state('app.home', {
            url: "/",
            views: {
                'access': {
                    templateUrl: "partials/home.html",
                    controller: 'HomeCtrl'
                }
            }

        });

});
