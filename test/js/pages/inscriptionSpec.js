/*globals describe : false, it:false, expect:false, beforeEach:false, inject:false*/
define(
    ['text!templates/inscription.html', 'angular-mocks', 'pages/inscription'],
    function (template) {
        "use strict";

        // attachement de l'application inscription a une div spécifique, pour éviter de bootstrapper ls app aux meme endroits
        var elementApp = angular.element(template);

        angular.bootstrap(elementApp, ['inscription']);
        /**
         * Mock la fonction de création d'une inscription
         */
        function mockInscriptionRestCreate() {
            // mock de la promesse
            var mockedPromise = function (userData) {
                return {
                    success: function (callback) {
                        callback(userData);
                        return this;
                    },
                    error: function () {
                        return this;
                    }
                };
            };

            return function (userData) {
                return mockedPromise(userData);
            };
        }


        /**
         * Mock la Factorie InscriptionRest
         */
        function mockInscriptionRest() {
            return function(){
                    return {createUser: mockInscriptionRestCreate(),
                    setCompanySiret: function () {},
                    getCompany: function () {},
                    update: function () {},
                    delete: function () {}
                };
            };
        }

        describe('InscriptionController', function () {
            var $controllerInjector,
                $scope;

            // charge le module a tester
            beforeEach(module('inscription'));

            // The injector unwraps the underscores (_) from around the parameter names when matching
            // Récupération de l'injecteur de controlleur angular
            beforeEach(inject(function (_$controller_) {
                $controllerInjector = _$controller_;
            }));

            // Initialisation du scope, compilation du
            beforeEach(inject(function ($rootScope, $compile) {
                $scope = $rootScope.$new();
                $scope.$digest();
                // compilation angular du template
                $compile(elementApp)($scope);
                $scope.$digest();
                // on déclenche la validation immédiatement
                $scope.debounceFactor = 0;
            }));

            describe('check injection', function () {
                it('should set the value \'angularLoaded\' to true', function () {
                    // récupération du controlleur InscriptionController
                    var controller = $controllerInjector('InscriptionController', {
                        $scope: $scope,
                        inscriptionRest: {
                            createUser: function () {}
                        }
                    });
                    // puis vérifie qu'il n'est pas nul et que les valeurs initiales sont bien positionees
                    expect(controller).not.to.equal(null);
                    expect($scope.angularLoaded).to.equal(true);
                });
            });
            describe('check Form', function () {
                var form, mockedGoToDashboard;

                beforeEach(function () {
                    // injection du controlleur
                    $controllerInjector('InscriptionController', {
                        $scope: $scope,
                        $window: {},
                        ceApi: mockInscriptionRest()
                    });

                    // récupération de l'element formulaire
                    form = $scope.inscriptionForm;

                    $scope.goToDashboard = function () {
                        mockedGoToDashboard();
                    };
                });

                it('form is invalid when no data are filled', function () {
                    expect(form.$valid).to.equal(false);
                });


                it('form is valid when all data are correctly filled', function () {
                    form.email.$setViewValue('john.doe@gmail.com');
                    form.nom.$setViewValue('John');
                    form.prenom.$setViewValue('Doe');
                    form.passwordMain.$setViewValue('MyLongPassword');
                    form.passwordConfirm.$setViewValue('MyLongPassword');
                    expect(form.$valid).to.equal(true);
                });

                it('form is invalid when email is invalid', function () {
                    form.email.$setViewValue('john.doe_gmail.com');
                    form.nom.$setViewValue('John');
                    form.prenom.$setViewValue('Doe');
                    form.passwordMain.$setViewValue('MyLongPassword');
                    form.passwordConfirm.$setViewValue('MyLongPassword');
                    expect(form.$valid).to.equal(false);
                    form.email.$setViewValue('john.doe@gmailcom');
                    form.nom.$setViewValue('John');
                    form.prenom.$setViewValue('Doe');
                    form.passwordMain.$setViewValue('MyLongPassword');
                    form.passwordConfirm.$setViewValue('MyLongPassword');
                    expect(form.$valid).to.equal(false);
                    form.email.$setViewValue('@gmail.com');
                    form.nom.$setViewValue('John');
                    form.prenom.$setViewValue('Doe');
                    form.passwordMain.$setViewValue('MyLongPassword');
                    form.passwordConfirm.$setViewValue('MyLongPassword');
                    expect(form.$valid).to.equal(false);
                });

                it('cannot call inscription when form is invalid', function () {
                    form.email.$setViewValue('john.doe_gmail.com');
                    form.nom.$setViewValue('John');
                    form.prenom.$setViewValue('Doe');
                    form.passwordMain.$setViewValue('MyLongPassword');
                    form.passwordConfirm.$setViewValue('MyLongPassword');
                    expect(form.$valid).to.equal(false);

                    $scope.inscription();
                    // lors de l'inscription, si l'enregistrement est invalide, la valeur validated est égale à false
                    expect($scope.validated).to.equal(false);
                });

                it('call inscription when form is valid', function () {
                    form.email.$setViewValue('john.doe@gmail.com');
                    form.nom.$setViewValue('John');
                    form.prenom.$setViewValue('Doe');
                    form.passwordMain.$setViewValue('MyLongPassword');
                    form.passwordConfirm.$setViewValue('MyLongPassword');
                    expect(form.$valid).to.equal(true);

                    mockedGoToDashboard = function () {
                        expect(true).to.equal(true);
                    };

                    $scope.inscription();

                    // lors de l'inscription, si l'enregistrement est valide, la valeur validated est égale à true
                    expect($scope.validated).to.equal(true);
                });
            });
        });
    }
);
