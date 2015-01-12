define([
        'text!templates/saisieOffre.html',
        'controllers/saisieOffreController',
        'directives/autoCompletePlaces',
        'factories/ceApi',
        'angular',
        'angular-animate'
    ],
    function (template, saisieOffreController, autoCompletePlaces, ceApi) {
        'use strict';
        var element = document.getElementById("angularApp");
        angular.element(element).append(angular.element(template));
        angular
            .module('saisieOffre', ['ngAnimate'])
            .factory('ceApi', ['$http', ceApi])
            .directive('autoCompletePlaces', [autoCompletePlaces])
            .controller('SaisieOffreController', ['$scope', 'ceApi', saisieOffreController]);

    }
);
