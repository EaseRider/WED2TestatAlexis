/**
 * Created by Galaxus on 22.10.2015.
 */

require.config({
    baseUrl: './',
    paths: {
        'angular': 'frameworks/angular/angular.min',
        'app': 'classes'
        },
        shim: {
            'angular': {
                exports: 'angular'
            }
        }
});

require(['angular', 'app/modules/lafete'], function(Angular, Lafete){});

//    return Angular.bootstrap(Lafete);
