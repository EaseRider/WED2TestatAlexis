/**
 * Created by Galaxus on 22.10.2015.
 */

define(['app/controllers/EventListController', 'frameworks/angular', 'libraries/angularMocks', 'app/repository/eventRepository', 'app/services/uuidService'],
    function(EventListController, Angular, AngularMocks, EventRepository, UUIDService){
        'use strict';
        var scope, eventRepository, $httpBackend;

        beforeEach(AngularMocks.inject(function ($injector, $rootScope) {
            scope = $injector.get('$rootScope').$new();
            $httpBackend = $injector.get('$httpBackend');

            var events = [{id: UUIDService.getRandomUuid(), name: 'Dinner'},{id: UUIDService.getRandomUuid(), name: 'Lunch'},{id: UUIDService.getRandomUuid(), name: 'Brunch'}];
            eventRepository = {
                all: function(successCallback) {
                    successCallback(events);
                }
            };
            // EventListController.$inject = ['scope', 'EventRepository'];

            //eventListController = new EventListController(scope, eventRepository);

        }));
        describe('EventListController Suite', function() {
            describe('property scope', function() {
                it('contains 3 events', function() {
                    var eventListController = new EventListController(scope, eventRepository);
                    expect(3).toBe(eventListController.scope.events.length);
                    //var scope = {};
                    //expect(eventListController.events.all).toBeDefined();
                });

                it('Each Event should have a UUID as id', function() {
                    var regex = new RegExp('[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}');

                    var eventListController = new EventListController(scope, eventRepository);

                    var events = eventListController.scope.events;
                    for (var i = 0; i < events.length; i++) {
                        expect(events[i].id).toMatch(regex);
                    }
                    expect(true).toBe(true);// damit console nicht motzt
                });
            })
        });
    });


