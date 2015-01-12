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
    baseUrl: '/base/app/assets/javascripts/',
    paths: {
        'async' :               '/base/public/javascripts/libs/requirejs/async',
        'lodash' :              '/base/public/javascripts/libs/lodash',
        'Taggle' :              '/base/public/javascripts/libs/taggle',
        'requirejs':            '/base/public/javascripts/libs/require-2.1.15',
        'jquery':               '/base/public/javascripts/libs/jquery',
        'text':                 '/base/public/javascripts/libs/text',
        'angular':              '/base/public/javascripts/libs/angular/angular',
        'angular-animate':      '/base/public/javascripts/libs/angular/angular-animate',
        'angular-route':        '/base/public/javascripts/libs/angular/angular-route',
        'angular-sanitize':     '/base/public/javascripts/libs/angular/angular-sanitize',
        'angular-mocks':        '/base/public/javascripts/libs/angular/angular-mocks',
        'moment':               '/base/public/javascripts/libs/moment',
        'Modernizr':            '/base/public/javascripts/libs/modernizr',
        'templates':            '/base/app/assets/templates',
        'templatesDirectives':  '/base/app/assets/templates/directives',
        'modules/placesApi':    '/base/test/js/modules/mockedPlacesApi',
        'Squire' :              '/base/test/js/lib/Squire'
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
