require(['require.config'], function () {
    'use strict';

    require(['angular', 'pages/inscription'], function (angular) {
        angular.bootstrap(document, ['inscription']);
    });

});
