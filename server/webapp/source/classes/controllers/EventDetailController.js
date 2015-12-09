/**
 * Created by Galaxus on 26.11.2015.
 */
// classes/controllers/EventDetailController.js
define(['app/model/event'], function (Event) {
    'use strict';
    //var EventRepository;
    var EventDetailController = function($scope, $routeParams, EventRepository, $location) {
        this.scope = $scope;
        this.scope.EventRepository = EventRepository;
        if ($routeParams.eventId) {
            EventRepository.get($routeParams.eventId, function (event) {
                $scope.event = event;
                console.log(event);
            });
        } else {
            this.scope.event = new Event();
        }

        this.scope.add = function(event) {
            console.log(this);
            console.log('add(event):');
            EventRepository.add(event, function(event) {
                console.log('Event created:');
                console.log(event);
                $location.path('/events/'+event.id);
            });
        }
    };

    return EventDetailController;
});
