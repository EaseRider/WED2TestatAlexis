/**
 * Created by Galaxus on 26.11.2015.
 */
// classes/controllers/event/detailController.js
define([], function() {
    'use strict';

    var EventDetailController = function($scope, $routeParams, EventRepository) {
        this.scope = $scope;
        EventRepository.get($routeParams.eventId, function (event) {
            $scope.event = event;
            console.log(event);
        });
        //this.scope.event = EventRepository.get($routeParams.eventId);
    }

    return EventDetailController;
});
