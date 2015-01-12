require(['require.config'], function () {
    'use strict';

    require(['angular', 'pages/facturation'], function (angular) {
        angular.bootstrap(document, ['facturation']);
    });

});
