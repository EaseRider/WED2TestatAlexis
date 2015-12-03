/**
 * Created by Galaxus on 22.10.2015.
 */

define(['frameworks/angular', 'app/controllers/EventListController', 'app/services/storageService', 'app/controllers/event/detailController', 'libraries/angularRoute'],
    function(Angular, EventListController, StorageService, EventDetailController) {
        'use strict';
        var Lafete = Angular.module('lafete', ['ngRoute']);

        /* Services */
        Lafete.service('StorageService', StorageService);

        /* Controllers */
        EventListController.$inject = ['$scope', 'StorageService'];
        Lafete.controller('EventListController', EventListController);

        EventDetailController.$inject = ['$scope', '$routeParams', 'StorageService'];
        Lafete.controller('EventDetailController', EventDetailController);

        /* Routes */
        Lafete.config(function($routeProvider) {

                console.log($routeProvider);
                $routeProvider.when('/events', {
                    controller: 'EventListController',
                    templateUrl: './views/event/list.html'
                }).when('/events/:eventId', {
                    controller: 'EventDetailController',
                    templateUrl: './views/event/detail.html'
                }).otherwise({
                    redirectTo: '/events'
                });
            }
        );
        return Lafete;
});
