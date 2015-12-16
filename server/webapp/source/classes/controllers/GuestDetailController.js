/**
 * Created by Galaxus on 09.12.2015.
 */
define(['app/model/Guest'], function (Guest) {
    'use strict';

    var GuestDetailController = function($scope, $routeParams, EventRepository, GuestRepository, $location) {
        this.scope = $scope;
        this.scope.GuestRepository = GuestRepository;;
        this.scope.EventRepository = EventRepository;

        console.log('EventDetailController()');

        // get Event, to check wheter it exists
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
            GuestRepository.add($scope.event.id, guest, function(guest) {
                console.log('Guest created:');
                console.log(guest);
                $location.path('/events/'+$scope.event.id);
            });
        }
    };

    return GuestDetailController;
});
