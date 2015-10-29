/**
 * Created by Galaxus on 22.10.2015.
 */
require.config({
    baseUrl: './',
    paths: {
        'frameworks/angular': '../source/frameworks/angular/angular.min',
        'app': '../source/classes',
        'tests': 'classes',
        'libraries/jasmine': ['libraries/jasmine/jasmine'],
        'libraries/jasmine-html': ['libraries/jasmine/jasmine-html'],
        'libraries/jasmine-boot': ['libraries/jasmine/boot']
    },
    shim: {
        'frameworks/angular': {
            exports: ['angular']
        },
        'libraries/jasmine-html': {
            deps : ['libraries/jasmine']
        },
        'libraries/jasmine-boot': {
            deps : ['libraries/jasmine', 'libraries/jasmine-html']
        }
    }
});


require(['libraries/jasmine-boot'], function () {
    require(['tests/model/eventTest'], function(){
        //trigger Jasmine
        window.onload();
    });
    require(['tests/controllers/EventListControllerTest'], function(){
        //trigger Jasmine
        window.onload();
    });
});
