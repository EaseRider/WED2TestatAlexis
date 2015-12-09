/**
 * Created by Galaxus on 26.11.2015.
 */
// classes/controllers/event/detailController.js
define(['app/model/event'], function (Event) {
    'use strict';
    //var EventRepository;
    var EventDetailController = function($scope, $routeParams, EventRepository) {
        this.scope = $scope;
        this.EventRepository = EventRepository;
        if ($routeParams.eventId) {
            EventRepository.get($routeParams.eventId, function (event) {
                $scope.event = event;
                console.log(event);
            });
        } else {
            this.scope.event = new Event();
        }

        $scope.add = new function(EventRepository, event) {
            console.log('add(event):');
            /*EventRepository.add(event, function(event) {
                console.log('Event created:');
                console.log(event);
            });*/
        }
    }

    EventDetailController.add = new function(EventRepository, event) {
        console.log("Adding Eventus");
        /*
        EventRepository.add(event, function(event) {
            console.log('Event created:');
            console.log(event);
        });*/
    }

    return EventDetailController;
});
