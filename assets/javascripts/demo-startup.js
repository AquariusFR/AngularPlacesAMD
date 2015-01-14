require(['require.config'], function () {
    'use strict';

    require(['angular', 'pages/demo'], function (angular) {
        angular.bootstrap(document, ['demo']);
    });

});
