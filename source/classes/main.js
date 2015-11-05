/**
 * Created by Galaxus on 22.10.2015.
 */

require.config({
    baseUrl: './',
    paths: {
            'libraries/angularRoute': 'libraries/angular/angular-route.min',
            'angular': 'frameworks/angular/angular.min',
            'app': 'classes'
        },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'libraries/angularRoute': {
            deps: ['angular']
        }
    }
});


require(['angular', 'app/modules/lafete'], function (Angular, Lafete) {
    Angular.element(document).ready(function() {
        Angular.bootstrap(document, [Lafete.name]);
    });
});


