define([],
    function () {
        'use strict';

        return function ($scope, ceApi) {
            var ceApiInstance = new ceApi();
            $scope.created = false;
            $scope.loading = false;
            $scope.error = false;
            $scope.jobOffer = {
                titre : 'test',
                localisations : []
            };
            $scope.angularLoaded = true;
            $scope.inscription = function () {
                $scope.loading = true;
                ceApiInstance.createJobOffer($scope.jobOffer)
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.created = true;
                        $scope.error = false;
                        console.log("submitting ok ", data);
                    })
                    .error(function (data) {
                        $scope.loading = false;
                        $scope.created = false;
                        $scope.error = true;
                        console.error("error submitting ", data);
                    });
            };
        };
    }
);
