define([], function () {
    'use strict';
    var privateStuff = {
        jobOfferRestEndpoint: "/saisie_offre",
        userRestEndpoint: "/user",
        companyRestEndpoint: "/facturation/company"
    };
    return function ($http) {
        return function () {
            return {
                createUser: function (user) {
                    return $http.post(privateStuff.userRestEndpoint, user);
                },
                createCompany: function (company) {
                    return $http.post(privateStuff.companyRestEndpoint, company);
                },
                setCompanySiret: function (company, siret) {
                    company.siret = siret;
                    return $http.put(privateStuff.companyRestEndpoint + "/" + company.id, company);
                },
                getCompany: function (companyID) {
                    return $http.get(privateStuff.companyRestEndpoint + "/" + companyID);
                },
                createJobOffer: function (jobOffer) {
                    return $http.post(privateStuff.jobOfferRestEndpoint, jobOffer);
                }
            };
        };
    };
});
