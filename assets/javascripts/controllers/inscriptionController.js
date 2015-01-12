/*globals console:false*/
define([], function () {
    'use strict';
    return function ($scope, $windows, ceApi) {

        var ceApiInstance = new ceApi();

        $scope.debounceFactor = 300;
        $scope.user = {
            mail: "",
            name: "",
            firstname: "",
            password: {
                main: "",
                confirm: ""
            }
        };
        $scope.validated = false;
        $scope.loading = false;
        $scope.angularLoaded = true;

        // déclenche un callback quand la condition vérifiée est à true
        $scope.$watch(
            function () {
                return $scope.inscriptionForm.email.$valid && $scope.user.mail !== "";
            },
            function(actualStatus) {
                if(actualStatus){
                    // TODO faire un appel pour vérifier l'existence du mail.
                    console.log("TODO throw a verify email call");
                }
            }
        );

        // inscription, si le formulaire est valide, on l'envoie en REST au serveur
        $scope.inscription = function () {
            // double check
            if ($scope.inscriptionForm.$valid) {
                $scope.loading = true;

                ceApiInstance.createUser($scope.user)
                    .success(function (createdUser) {
                        $scope.userId = createdUser.id;
                        $scope.validated = true;
                        $scope.loading = false;
                        $scope.goToDashboard();
                    })
                    .error(function (data) {
                        console.error("error submitting ! ", $scope.user, data);
                        $scope.validated = false;
                    });
            }
        };

        $scope.goToDashboard = function () {
            $windows.location.href = '/tableau_de_bord?userId=' + $scope.userId;
        };

        /*Ces fonctions permettent de rendre le tempalte html plus lisible*/
        $scope.isValueEmpty = function (value) {
            return value === '';
        };
        $scope.isInputValid = function (value, formValue) {
            return !$scope.isValueEmpty(value) && formValue.$valid;
        };
        $scope.isInputInvalid = function (value, formValue) {
            return !$scope.isValueEmpty(value) && !formValue.$valid;
        };
        $scope.isPasswordConfirmed = function () {
            return $scope.isInputValid($scope.user.password.confirm, $scope.inscriptionForm.passwordConfirm) && $scope.user.password.main === $scope.user.password.confirm;
        };
        $scope.isPasswordNotConfirmed = function () {
            return $scope.isInputValid($scope.user.password.confirm, $scope.inscriptionForm.passwordConfirm) && $scope.user.password.main !== $scope.user.password.confirm;
        };
    };
});
