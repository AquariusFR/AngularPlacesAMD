/*globals console:false*/
define(['modules/siretFormatter'], function (siretFormatter) {
    'use strict';
    return function ($scope, ceApi) {
        var ceApiInstance = new ceApi();
        $scope.siretFormatterInstance = siretFormatter();
        $scope.company = {
            siret : ""
        };
        $scope.angularLoaded = true;
        $scope.isPageValueLoaded = false;
        $scope.isSiretAlreadyRegistered = false;
        $scope.isSiretUpdated = false;
        $scope.isSiretOnError = false;

        /* Permet de transferer directement des données de la page à Angular*/
        $scope.init = function (value) {
            if (!$scope.isPageValueLoaded) {
                $scope.isPageValueLoaded = true;
                if (value.id === "") {
                    return;
                }
                ceApiInstance.getCompany(value.id)
                    .success(function (data) {
                        $scope.isSiretAlreadyRegistered = true;
                        $scope.company = data;
                    })
                    .error(function (data) {
                        $scope.company = {};
                        console.error("error submitting ", value.id, data);
                    });
            }
        };

        $scope.sendSiret = function () {

            // double check
            if (!$scope.facturationForm.$valid) {
                return;
            }
            ceApiInstance.setCompanySiret($scope.company, $scope.company.siret)
                .success(function (data) {
                    $scope.isSiretUpdated = true;
                    $scope.isSiretOnError = false;
                    console.log("submitting ok ", $scope.company, data);
                })
                .error(function (data) {
                    $scope.isSiretUpdated = false;
                    $scope.isSiretOnError = true;
                    console.error("error submitting ", $scope.company, data);
                });
        };

        $scope.createCompany = function () {

            // double check
            if ($scope.company.name === "" && $scope.company.id !== "") {
                return;
            }
            ceApiInstance.createCompany($scope.company)
                .success(function (data) {
                    $scope.isSiretUpdated = true;
                    $scope.isSiretOnError = false;
                    console.log("submitting ok ", $scope.company, data);
                    $scope.company = data;
                })
                .error(function (data) {
                    $scope.isSiretUpdated = false;
                    $scope.isSiretOnError = true;
                    console.error("error submitting ", $scope.company, data);
                });
        };
    };
});
