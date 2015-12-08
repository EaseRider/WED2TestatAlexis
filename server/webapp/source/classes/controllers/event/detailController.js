/**
 * Created by Galaxus on 26.11.2015.
 */
// classes/controllers/event/detailController.js
define(['app/model/event'], function (Event) {
    'use strict';

    var EventDetailController = function($scope, $routeParams, EventRepository) {
        this.scope = $scope;
        if ($routeParams.eventId) {
            EventRepository.get($routeParams.eventId, function (event) {
                $scope.event = event;
                console.log(event);
            });
        } else {
            this.scope.event = new Event();
            console.log("halloo");
            console.log(this.scope.event);
        }
    }

    return EventDetailController;
});
