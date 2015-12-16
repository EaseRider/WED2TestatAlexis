/**
 * Created by Galaxus on 22.10.2015.
 */

define(['frameworks/angular', 'app/controllers/EventListController', 'app/repository/eventRepository',
            'app/repository/guestRepository', 'app/controllers/EventDetailController', 'app/controllers/GuestDetailController', 'libraries/angularRoute'],
    function(Angular, EventListController, EventRepository, GuestRepository, EventDetailController, GuestDetailController) {
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

        EventDetailController.$inject = ['$scope', '$routeParams', 'EventRepository', '$location'];
        Lafete.controller('EventDetailController', EventDetailController);


        GuestDetailController.$inject = ['$scope', '$routeParams', 'EventRepository', 'GuestRepository', '$location'];
        Lafete.controller('GuestDetailController', GuestDetailController);

        /* Routes */
        Lafete.config(function($routeProvider) {
                console.log($routeProvider);
                $routeProvider.when('/events', {
                    controller: 'EventListController',
                    templateUrl: './views/event/list.html'
                }).when('/events/:eventId', {
                    controller: 'EventDetailController',
                    templateUrl: './views/event/detail.html'
                }).when('/events/addGuest/:eventId', {
                    controller: 'GuestDetailController',
                    templateUrl: './views/guest/edit.html'
                }).when('/event/add', {
                    controller: 'EventDetailController',
                    templateUrl: './views/event/edit.html'
                }).otherwise({
                    redirectTo: '/events'
                });
            }
        );
        //console.log($routeProvider);
        console.log(Lafete);
        return Lafete;
});
