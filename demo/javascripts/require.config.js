requirejs.config({
    baseUrl : "./javascripts/",
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
        'text':                 'libs/text',
        'async':                'libs/requirejs/async',
        'goog':                 'libs/requirejs/goog',
        'angular':              'libs/angular/angular',
        'angular-animate':      'libs/angular/angular-animate',
        'angular-route':        'libs/angular/angular-route',
        'angular-sanitize':     'libs/angular/angular-sanitize',
        'angular-google-maps':  'libs/angular-google-maps',
        'lodash':               'libs/lodash',
        'Taggle':               'libs/taggle',
        'directives' :          '../../assets/javascripts/directives',
        'modules' :             '../../assets/javascripts/modules'
    }
});
