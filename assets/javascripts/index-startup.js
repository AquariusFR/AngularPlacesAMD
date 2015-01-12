require(["require.config"], function () {
    'use strict';

    require(['jquery'], function ($) {
        $(document).ready(function () {
            $("#login").focus();
            $("#password").focus();
        });
    });
});
