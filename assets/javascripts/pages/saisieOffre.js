define([
        'text!templates/saisieOffre.html',
        'controllers/saisieOffreController',
        'directives/autoCompletePlaces',
        'angular',
        'angular-animate'
    ],
    function (template, saisieOffreController, autoCompletePlaces) {
        'use strict';
        var element = document.getElementById("angularApp");
        angular.element(element).append(angular.element(template));
        angular
            .module('saisieOffre', ['ngAnimate'])
            .directive('autoCompletePlaces', [autoCompletePlaces])
            .controller('SaisieOffreController', ['$scope', saisieOffreController]);

    }
);
