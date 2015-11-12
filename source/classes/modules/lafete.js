/**
 * Created by Galaxus on 22.10.2015.
 */

define(['frameworks/angular', 'app/controllers/EventListController', 'app/services/storageService', 'libraries/angularRoute'],
    function(Angular, EventListController, StorageService) {
        'use strict';
        var Lafete = Angular.module('lafete', ['ngRoute']);

        /* Services */
        Lafete.service('StorageService', StorageService);

        /* Controllers */
        EventListController.$inject = ['$scope', 'StorageService'];
        Lafete.controller('EventListController', EventListController);

        Lafete.config(function($routeProvider) {
                $routeProvider.when('/', {
                    controller: 'EventListController',
                    templateUrl: './views/list.html'
                });
            }
        );

        return Lafete;
});
