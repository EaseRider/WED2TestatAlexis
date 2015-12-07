/**
 * Created by Galaxus on 22.10.2015.
 */


define([], function(){
    'use strict';
    var EventListController = function ($scope, EventRepository) {
        this.scope = $scope;
        //this.scope.events = EventRepository.events;
        this.scope.eventBla = 'Lool';
        EventRepository.all(function (events) {
            // Can not call to This/scope here???? only $scope
            //this.scope.eventBlaOther = 'Lool22  ';

            $scope.events = events;
            //this.scope.events = events;
        });
    }
    return EventListController;
});


