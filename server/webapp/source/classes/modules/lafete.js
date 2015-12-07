/**
 * Created by Galaxus on 22.10.2015.
 */

define(['frameworks/angular', 'app/controllers/EventListController', 'app/repository/eventRepository', 'app/controllers/event/detailController', 'libraries/angularRoute'],
    function(Angular, EventListController, EventRepository, EventDetailController) {
        'use strict';
        var Lafete = Angular.module('lafete', ['ngRoute']);

        /* Services */
        EventRepository.$inject = ['$http'];
        Lafete.service('EventRepository', EventRepository);

        /* Controllers */
        EventListController.$inject = ['$scope', 'EventRepository'];
        Lafete.controller('EventListController', EventListController);

        EventDetailController.$inject = ['$scope', '$routeParams', 'EventRepository'];
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
