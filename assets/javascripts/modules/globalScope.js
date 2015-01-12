define(function () {
        'use strict';

        function windowWith() {
            return (window.innerWidth !== undefined) ? window.innerWidth : Math.max(document.documentElement.clientWidth, document.body.clientWidth);
        }

        var global = {
            window: window,
            document: document,
            navigator: navigator,
            screen: screen,
            windowWidth: windowWith()
        };

        /**
         * Pour les tests unitaires
         */
        function resetForTests() {
            global.window = window;
            global.document = document;
            global.navigator = navigator;
            global.screen = screen;
            global.windowWidth = windowWith();

            return global;
        }

        global.resetForTests = resetForTests;

        return global;
    }
);
