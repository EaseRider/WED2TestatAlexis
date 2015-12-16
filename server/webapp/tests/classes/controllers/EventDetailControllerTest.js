/**
 * Created by Galaxus on 16.12.2015.
 */


define(['app/controllers/EventDetailController', 'frameworks/angular', 'libraries/angularMocks', 'app/repository/eventRepository', 'app/services/uuidService'],
    function(EventDetailController, Angular, AngularMocks, EventRepository, UUIDService){
        'use strict';
        var scope, eventRepository, $httpBackend, routeParams, location, event;

        beforeEach(AngularMocks.inject(function ($injector, $rootScope) {

            event = {id: UUIDService.getRandomUuid(), name: 'Dinner'};

            scope = $injector.get('$rootScope').$new();
            $httpBackend = $injector.get('$httpBackend');

            routeParams = {eventId: event.id};

            location = function() {
                this.theUrl = '';
                this.path = function(url) {
                    this.theUrl = url;
                }
            };

            var events = [{id: UUIDService.getRandomUuid(), name: 'Dinner'},{id: UUIDService.getRandomUuid(), name: 'Lunch'},{id: UUIDService.getRandomUuid(), name: 'Brunch'}];
            eventRepository = {
                get: function(eventId, successCallback) {
                    if (eventId == event.id) {
                        successCallback(event);
                    }
                },
                add: function(event, successCallback) {
                    if (event) {
                        successCallback(event);
                    }
                }
            };

        }));
        describe('EventDetailController Suite', function() {
            describe('property scope', function() {
                it('contains the event', function() {
                    var eventDetailController = new EventDetailController(scope, routeParams, eventRepository, new location());
                    expect(eventDetailController.scope.event).not.toBe(null);
                    expect(eventDetailController.scope.event.id).toBe(event.id);
                    expect(scope.event).not.toBe(null);
                    expect(scope.event.id).toBe(event.id);
                    //expect(3).toBe(eventListController.scope.events.length);
                    //var scope = {};
                    //expect(eventListController.events.all).toBeDefined();
                });

                it('Adding event', function() {

                    var newEvent = {id: UUIDService.getRandomUuid(), name: 'Dinner'};
                    var locator = new location();
                    var eventDetailController = new EventDetailController(scope, routeParams, eventRepository, locator);
                    scope.add(newEvent);
                    expect(locator.theUrl).toBe('/events/'+newEvent.id);
                });
            })
        });
    });


