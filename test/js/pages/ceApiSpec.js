/*globals describe : false, it:false, expect:false, beforeEach:false, inject:false*/
define(['factories/ceApi', 'angular-mocks'],function (requireCeApi) {
    "use strict";
    describe('ce Api', function () {
        var ceApi, httpBackend;

        /* déclaration d'un module de test faisant référence à la factory */
        angular.module('test', [])
            .factory('ceApi', ['$http', requireCeApi]);

        beforeEach(module('inscription'));
        beforeEach(inject(function (_ceApi_, $httpBackend) {
            ceApi = _ceApi_;
            httpBackend = $httpBackend;
        }));

        it('return the correct data when create user', function () {
            httpBackend.whenPOST("/user").respond({
                data: "someData"
            });

            var promise = new ceApi().createUser('toto');
            promise.success(function (response) {
                console.log('response',response);
                expect(response.data).to.equal("someData");
                expect(response).not.to.equal(null);
            }).error(function (data) {
                expect(data).to.equal(null);
            });
            httpBackend.flush();
        });

        it('return the correct data when create company', function () {
            httpBackend.whenPOST("/facturation/company").respond({
                data: "someData"
            });

            var promise = new ceApi().createCompany('toto');
            promise.success(function (response) {
                expect(response).not.to.equal(null);
                expect(response.data).to.equal("someData");
            }).error(function (data) {
                expect(data).to.equal(null);
            });
            httpBackend.flush();
        });

        it('return the correct data when setCompanySiret', function () {
            httpBackend.whenPUT("/facturation/company/someId").respond({
                data: "someData"
            });

            var promise = new ceApi().setCompanySiret({siret:'iAmASiret', id:'someId'}, '');
            promise.success(function (response) {
                expect(response).not.to.equal(null);
                expect(response.data).to.equal("someData");
            }).error(function (data) {
                expect(data).to.equal(null);
            });
            httpBackend.flush();
        });

        it('return the correct data when get Company', function () {
            httpBackend.whenGET("/facturation/company/someId").respond({
                data: "someData"
            });

            var promise = new ceApi().getCompany('someId');
            promise.success(function (response) {
                expect(response).not.to.equal(null);
                expect(response.data).to.equal("someData");
            }).error(function (data) {
                expect(data).to.equal(null);
            });
            httpBackend.flush();
        });

        it('return the correct data when get createJobOffer', function () {
            httpBackend.whenPOST("/saisie_offre").respond({
                data: "someData"
            });

            var promise = new ceApi().createJobOffer('someId');
            promise.success(function (response) {
                expect(response).not.to.equal(null);
                expect(response.data).to.equal("someData");
            }).error(function (data) {
                expect(data).to.equal(null);
            });
            httpBackend.flush();
        });
    });
});
