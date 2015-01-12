require(['text!templates/successLogin.html', 'angular'], function (template) {
    'use strict';

    var element = document.getElementById("angularApp");
    angular.element(element).append(angular.element(template));
    window.location.href = "http://recruteurs.cadremploi.fr/emploi/fr.cadremploi.pro.page.login.LoginCtrl?action=Valider&mth=Valider&email=@(login)&password=@(password)&provenance=directLogin";
});
