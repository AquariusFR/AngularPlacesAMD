requirejs.config({
    baseUrl : "../assets/javascripts/",
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-google-maps': {
            deps: ['angular', 'lodash']
        },
        'Modernizr': {
            exports: 'Modernizr'
        },
        'Taggle': {
            exports: 'Taggle'
        }
    },

    paths: {
        'text':                 '../../demo/javascripts/libs//text',
        'async':                '../../demo/javascripts/libs//requirejs/async',
        'goog':                 '../../demo/javascripts/libs//requirejs/goog',
        'propertyParser':       '../../demo/javascripts/libs//requirejs/propertyParser',
        'jquery':               '../../demo/javascripts/libs//jquery',
        'angular':              '../../demo/javascripts/libs//angular/angular',
        'angular-animate':      '../../demo/javascripts/libs//angular/angular-animate',
        'angular-route':        '../../demo/javascripts/libs//angular/angular-route',
        'angular-sanitize':     '../../demo/javascripts/libs//angular/angular-sanitize',
        'angular-google-maps':  '../../demo/javascripts/libs//angular-google-maps',
        'lodash':               '../../demo/javascripts/libs//lodash',
        'moment':               'libs/moment',
        'Modernizr':            '../../demo/javascripts/libs//modernizr',
        'Taggle':               '../../demo/javascripts/libs//taggle',
        'templates':            '/assets/templates/'
    }
});
