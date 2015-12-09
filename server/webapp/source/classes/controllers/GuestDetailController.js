/**
 * Created by Galaxus on 09.12.2015.
 */
define(['app/model/Guest'], function (Guest) {
    'use strict';

    var GuestDetailController = function($scope, $routeParams, EventRepository, $location) {
        this.scope = $scope;
        this.scope.EventRepository = EventRepository;
        if ($routeParams.eventId) {
            EventRepository.get($routeParams.eventId, function (event) {
                $scope.event = event;
                console.log(event);
            });
            this.scope.guest = new Guest();
        } else {
            // Error!
        }

        this.scope.add = function(guest) {
            console.log(this);
            console.log('add(guest):');
            EventRepository.add(event, function(event) {
                console.log('Event created:');
                console.log(event);
                $location.path('/events/'+event.id);
            });
        }
    };

    return GuestDetailController;
});
