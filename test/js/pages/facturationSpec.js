/*globals describe : false, it:false, expect:false, beforeEach:false, inject:false, assert: false*/
define(
    ['text!templates/facturation.html', 'angular-mocks', 'pages/facturation'],
    function (template) {
        "use strict";

        var elementApp = angular.element(template);

        angular.bootstrap(elementApp, ['facturation']);

        describe('Check Facturation', function () {
            var $controllerInjector, inputElement, $scope, form, httpBackend;

            beforeEach(function () {
                module('facturation');
            });

            // The injector unwraps the underscores (_) from around the parameter names when matching
            // Récupération de l'injecteur de controlleur angular
            beforeEach(inject(function (_$controller_) {
                $controllerInjector = _$controller_;
            }));
            beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
                $scope = $rootScope.$new();
                // compilation angular du template
                $compile(elementApp)($scope);
                $scope.$digest();
                form = $scope.facturationForm;
                httpBackend = $httpBackend;
                inputElement = elementApp.find('input');
            }));

            describe('Check Facturation controller', function () {

                var controller;
                beforeEach(function(){
                    /// récupération du controlleur InscriptionController
                    controller = $controllerInjector('FacturationController', {
                        $scope: $scope
                    });
                })

                var initiateCompany = function (company){
                    httpBackend.whenGET("/facturation/company/"+company.id).respond(company);
                    $scope.init(company);
                    httpBackend.flush();
                }

                it('should set the value \'angularLoaded\' to true', function () {
                    // puis vérifie qu'il n'est pas nul et que les valeurs initiales sont bien positionees
                    expect(controller).not.to.equal(null);
                    expect($scope.angularLoaded).to.equal(true);
                });
                it("should try to get company, when an initial companyId is given", function () {

                    var initialCompany = {id:"test1"};
                    initiateCompany(initialCompany);

                    expect($scope.isSiretAlreadyRegistered).to.equal(true);
                    assert.deepEqual($scope.company, initialCompany);
                });
                it("should be able to send send siret, when correct siret is given", function () {
                    var initialCompany = {id:"test2"};
                    initiateCompany(initialCompany);

                    httpBackend.whenPUT("/facturation/company/"+initialCompany.id).respond(initialCompany);

                    form.siret.$setViewValue('90019789797892');
                    $scope.sendSiret();
                    httpBackend.flush();

                    expect($scope.isSiretUpdated).to.equal(true);
                    expect($scope.isSiretOnError).to.equal(false);
                });
                it("should not be able to send send siret, when an incorrect siret is given", function () {
                    var initialCompany = {id:"test2"};
                    initiateCompany(initialCompany);

                    form.siret.$setViewValue('90019789797893');
                    $scope.sendSiret();

                    expect($scope.isSiretUpdated).to.equal(false);
                });
                it("should have isSiretOnError at true, when server error occurs", function () {
                    var initialCompany = {id:"test3"};
                    initiateCompany(initialCompany);

                    httpBackend.whenPUT("/facturation/company/"+initialCompany.id).respond(500, '');
                    form.siret.$setViewValue('90019789797892');

                    $scope.sendSiret();
                    httpBackend.flush();

                    expect($scope.isSiretOnError).to.equal(true);
                });
            });


            describe('Check Siret Mask', function () {

                it("returns false, when an empty siret is given", function () {
                    form.siret.$setViewValue('');
                    expect(form.siret.$valid).to.equal(false);
                });

                it("returns false, when an no siret is given", function () {
                    form.siret.$setViewValue();
                    expect(form.siret.$valid).to.equal(false);
                });
                it("returns true, when a correct siret is given", function () {
                    form.siret.$setViewValue('90019789797892');
                    expect(form.siret.$valid).to.equal(true);
                });
                it("returns false, when a siret containing less than 14 numerics is given", function () {
                    form.siret.$setViewValue('0');
                    expect(form.siret.$valid).to.equal(false);
                });
                it("returns false, when a siret containing 14 numerics but still invalid is given", function () {
                    form.siret.$setViewValue('1111111111111');
                    expect(form.siret.$valid).to.equal(false);
                });
                it("returns false, when a siret containing less than 14 non-numerics is given", function () {
                    form.siret.$setViewValue('OOO?');
                    expect(form.siret.$valid).to.equal(false);
                });
                it("returns false, when a siret containing 14 non-numerics is given", function () {
                    form.siret.$setViewValue('7328293&00007%');
                    expect(form.siret.$valid).to.equal(false);
                });


                it("shows an empty string when only non-numeric siret is given", function () {
                    form.siret.$setViewValue('azerty$µ');
                    // lance le trigger d'input, permet d'activer le formattage du siret
                    angular.element(inputElement).triggerHandler('input');
                    expect(form.siret.$viewValue).to.equal("");
                });
                it("filters non-numeric caracters when partially non-numeric siret is given", function () {
                    form.siret.$setViewValue('112233azerty$µ');
                    // lance le trigger d'input, permet d'activer le formattage du siret
                    angular.element(inputElement).triggerHandler('input');
                    expect(form.siret.$viewValue).to.equal("112  233");
                });
                it("shows the SIREN when only 9 (or less) caracters is given", function () {
                    form.siret.$setViewValue('123456789');
                    // lance le trigger d'input, permet d'activer le formattage du siret
                    angular.element(inputElement).triggerHandler('input');
                    expect(form.siret.$viewValue).to.equal("123  456  789");
                });
                it("shows the SIREN and the Etablissement separated by '  ' when a string of 10 to 13 caracters is given", function () {
                    form.siret.$setViewValue('123456789012');
                    // lance le trigger d'input, permet d'activer le formattage du siret
                    angular.element(inputElement).triggerHandler('input');
                    expect(form.siret.$viewValue).to.equal("123  456  789  012");
                });
                it("shows the SIREN, the Etablissement and the Luhn Key separated by '  ' when a string of 14 caracters is given", function () {
                    form.siret.$setViewValue('12345678901234');
                    // lance le trigger d'input, permet d'activer le formattage du siret
                    angular.element(inputElement).triggerHandler('input');
                    expect(form.siret.$viewValue).to.equal("123  456  789  01234");
                });

                it("filters non-numeric caracters and do separation when partially non-numeric siret is given", function () {
                    form.siret.$setViewValue('1a2z3e4567890');
                    // lance le trigger d'input, permet d'activer le formattage du siret
                    angular.element(inputElement).triggerHandler('input');

                    expect(form.siret.$viewValue).to.equal("123  456  789  0");
                });
            });
        });
    }
);
