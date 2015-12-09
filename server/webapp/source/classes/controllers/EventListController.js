/**
 * Created by Galaxus on 22.10.2015.
 */


define([], function(){
    'use strict';
    var EventListController = function ($scope, EventRepository) {
        this.scope = $scope;

        EventRepository.all(function (events) {
            // Can not call to This/scope here???? only $scope
            // --> Callback
            $scope.events = events;
            //this.scope.events = events;
        });
    };
    return EventListController;
});


