/**
 * Created by Galaxus on 22.10.2015.
 */


define(['app/controllers/EventListController'], function(EventListController){
    'use strict';
    describe('EventListController', function() {
       describe('property scope', function() {
           it('contains 3 events', function() {
               var scope = {};
               var eventListController = new EventListController(scope);
               expect(3).toBe(eventListController.scope.events.length);
           })
       })
    });
});


