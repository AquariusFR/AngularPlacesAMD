define([
        'controllers/demoController',
        'directives/autoCompletePlaces',
        'angular',
        'angular-animate'
    ],
    function (demoController, autoCompletePlaces) {
        'use strict';
        angular
            .module('demo', ['ngAnimate'])
            .directive('autoCompletePlaces', [autoCompletePlaces])
            .controller('DemoController', ['$scope', demoController]);
    }
);
