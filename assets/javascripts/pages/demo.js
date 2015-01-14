define([
        'text!templates/demo.html',
        'controllers/demoController',
        'directives/autoCompletePlaces',
        'angular',
        'angular-animate'
    ],
    function (template, demoController, autoCompletePlaces) {
        'use strict';
        var element = document.getElementById("angularApp");
        angular.element(element).append(angular.element(template));
        angular
            .module('demo', ['ngAnimate'])
            .directive('autoCompletePlaces', [autoCompletePlaces])
            .controller('DemoController', ['$scope', demoController]);

    }
);
