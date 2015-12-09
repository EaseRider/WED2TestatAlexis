/**
 * Created by Galaxus on 22.10.2015.
 */

define(['frameworks/angular', 'app/controllers/EventListController', 'app/repository/eventRepository', 'app/repository/eventRepository', 'app/controllers/EventDetailController', 'libraries/angularRoute'],
    function(Angular, EventListController, EventRepository, GuestRepository, EventDetailController) {
        'use strict';
        var Lafete = Angular.module('lafete', ['ngRoute']);

        /* Services */
        EventRepository.$inject = ['$http'];
        Lafete.service('EventRepository', EventRepository);
        GuestRepository.$inject = ['$http'];
        Lafete.service('GuestRepository', GuestRepository);

        /* Controllers */
        EventListController.$inject = ['$scope', 'EventRepository'];
        Lafete.controller('EventListController', EventListController);

        console.log('LAfete: Call'+Date.now());

        EventDetailController.$inject = ['$scope', '$routeParams', 'EventRepository', '$location'];
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
                }).when('/event/add', {
                    controller: 'EventDetailController',
                    templateUrl: './views/event/edit.html'
                }).when('/events/:eventId/addGuest', {
                    controller: 'EventDetailController',
                    templateUrl: './views/event/edit.html'
                }).otherwise({
                    redirectTo: '/events'
                });
            }
        );
        return Lafete;
});
