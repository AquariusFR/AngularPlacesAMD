define([
    'text!templates/inscription.html',
    'controllers/inscriptionController',
    'factories/ceApi',
    'angular',
    'angular-animate'
],
    function (template, inscriptionController, ceApi) {
        'use strict';
        var element = document.getElementById("angularApp");
        angular.element(element).append(angular.element(template));
        angular.module('inscription', ['ngAnimate'])
            .factory('ceApi', ['$http', ceApi])
            .controller('InscriptionController', ['$scope', '$window', 'ceApi', inscriptionController]);
    }
);
