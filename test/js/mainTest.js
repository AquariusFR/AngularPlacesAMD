/*globals console : false*/
// This creates an array of all the files that Karma finds with a suffix of
// Test.js (eg utilsTest.js) to be added to the Require JS config below
var tests = [],
    file;
for (file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            console.log("Testing : " + file);
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/assets/javascripts/',
    paths: {
        'async' :               '/base/test/js/libs/requirejs/async',
        'lodash' :              '/base/test/js/libs/lodash',
        'Taggle' :              '/base/test/js/libs/taggle',
        'requirejs':            '/base/test/js/libs/require-2.1.15',
        'jquery':               '/base/test/js/libs/jquery',
        'text':                 '/base/test/js/libs/text',
        'angular':              '/base/test/js/libs/angular/angular',
        'angular-animate':      '/base/test/js/libs/angular/angular-animate',
        'angular-route':        '/base/test/js/libs/angular/angular-route',
        'angular-sanitize':     '/base/test/js/libs/angular/angular-sanitize',
        'angular-mocks':        '/base/test/js/libs/angular/angular-mocks',
        'moment':               '/base/test/js/libs/moment',
        'Modernizr':            '/base/test/js/libs/modernizr',
        'templates':            '/base/test/templates',
        'modules/placesApi':    '/base/test/js/modules/mockedPlacesApi',
        'Squire' :              '/base/test/js/libs/Squire'
    },
    shim: {
        'angular': {
            "exports": "angular"
        },
        'facturation': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-mocks':{
            deps:['angular'],
            'exports':'angular.mock'
        },
        'Taggle': {
            exports: 'Taggle'
        },
        'lodash': {
            exports: 'lodash'
        }
    },
    deps: tests, // add tests array to load our tests

    callback: window.__karma__.start // start tests once Require.js is done
});
