/**
 * Created by Galaxus on 26.11.2015.
 */
// classes/controllers/event/detailController.js
define([], function() {
    'use strict';

    var EventDetailController = function($scope, $routeParams, StorageService) {
        this.scope = $scope;
        this.scope.event = StorageService.events.get($routeParams.eventId);
    }

    return EventDetailController;
});
