define([
    'text!templates/facturation.html',
    'controllers/facturationController',
    'directives/siretMask',
    'factories/ceApi',
    'angular',
    'angular-animate'
],
    function (template, facturationController, siretMask, ceApi) {
        'use strict';

        var element = document.getElementById("angularApp");
        angular.element(element).append(angular.element(template));

        angular.module('facturation', ['ngAnimate'])
            .directive('siretMask', ['$filter', siretMask])
            .factory('ceApi', ['$http', ceApi])
            .controller('FacturationController', ['$scope', 'ceApi', facturationController]);
    }
);
