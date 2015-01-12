require(['require.config'], function () {
    'use strict';

    require(['angular', 'pages/saisieOffre'], function (angular) {
        angular.bootstrap(document, ['saisieOffre']);
    });

});
