require(["jquery"], function ($) {
    'use strict';
    $.fn.alertBoxes = function () {
        return this.each(function () {
            $(this).append('<span class="close" title="fermer">x</span>');
            var that = $(this);
            $(".close").click(function (e) {
                e.preventDefault();
                $(this).closest(that).slideUp();
            });
        });
    };
});
