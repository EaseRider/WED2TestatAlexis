/**
 * Created by Galaxus on 12.11.2015.
 */

define(['app/model/event', 'app/repository/eventRepository', 'app/services/uuidService', 'tests/factories/eventFactory', 'libraries/angularMocks'],
    function (Event, EventRepository, UUIDService, EventFactory, AngularMocks) {
        'use strict';

        describe('EventRepository test suite', function () {
            var eventRepository, event, $http, $httpBackend;
            var uuid = UUIDService.getRandomUuid();

            // setup
            beforeEach(AngularMocks.inject(function ($injector) {
                $http = $injector.get('$http');
                $httpBackend = $injector.get('$httpBackend');

                eventRepository = new EventRepository($http);
                event = EventFactory.createEventWithID(uuid);

                // $http Service will return this list of events when call /api/events
                $httpBackend.when('GET', eventRepository.urls.all).respond({
                    events: [{id: 1, name: 'Dinner'}, {id: 2, name: 'Lunch'}]
                });
                $httpBackend.when('GET', eventRepository.urls.get.replace('{eventId}', uuid)).respond({
                    id: uuid, name: 'Dinner'
                });
                $httpBackend.when('GET', eventRepository.urls.get.replace('{eventId}', 'not-existing-uuid')).respond(null);
                $httpBackend.when('POST', eventRepository.urls.add).respond({
                    event: event
                });

            }));

            describe('get()', function () {
                beforeEach(function () {
                    //eventRepository.events.add(event);
                });

                describe('by object id', function () {

                    it('returns the object', function () {
                        var event;
                        eventRepository.get(uuid, function (eventResult) {
                            event = eventResult;
                        });
                        $httpBackend.flush();
                        expect(event).not.toBe(null);
                        expect(event.id).toBe(uuid);
                    });
                });

                describe('by inexistent object id', function () {
                    it('returns null', function () {
                        var event;
                        eventRepository.get('not-existing-uuid', function (eventResult) {
                            event = eventResult;
                        });
                        $httpBackend.flush();
                        expect(event).toBeNull();
                    });
                });
            });


            describe('all()', function () {
                /*it('returns an Array', function () {
                    var findEvents = eventRepository.events.all();
                    expect(findEvents).toBeDefined();
                });*/
                it('returns an Array', function () {
                    var events = null;
                    eventRepository.all(function (eventList) {
                        events = eventList;
                    });
                    // Mock ajax channel needs to be flushed (calls needs to be fired) befor check
                    $httpBackend.flush();
                    expect(events).toEqual(jasmine.any(Array));
                });

                it('returns two events', function () {
                    var events = null;
                    eventRepository.all(function (eventList) {
                        events = eventList;
                    });
                    $httpBackend.flush();
                    expect(events.length).toBe(2);
                });

                it('returns real javascript objects', function() {
                    //$httpBackend.expectGET(eventRepository.urls.all);
                    var events = null;
                    eventRepository.all(function(eventList) {
                        events = eventList;
                    });
                    $httpBackend.flush();
                    expect(events[0]).toEqual(jasmine.any(Event));
                    expect(events[1]).toEqual(jasmine.any(Event));
                });

                it('no Objects empty Array', function() {
                    $httpBackend.expectGET(eventRepository.urls.all).respond(null);
                    var events = null;
                    eventRepository.all(function(eventList) {
                        events = eventList;
                    });
                    $httpBackend.flush();;
                    expect(events).toEqual(jasmine.any(Array));;
                    expect(events.length).toEqual(0);
                });
            });

            describe('add()', function () {
                it('inserts element', function () {
                    //$httpBackend.expectPOST(eventRepository.urls.add);
                    var eventResult;
                    var callResult = eventRepository.add(event, function(event){
                        eventResult = event;
                    });
                    $httpBackend.flush();
                    expect(eventResult).toEqual(event);
                });

              /*  describe('same element again', function () {
                    var size, status2;
                    // TODO

                    beforeEach(function () {
                        eventRepository.add(event);

                        size = eventRepository.events.length;
                        status2 = eventRepository.add(event);
                    });

                    it('doesn\'t affect repository size', function () {
                        expect(eventRepository.events.length).toBe(size);
                    });

                    it('returns false', function () {
                        expect(status2).toBe(true);
                        // TODO
                    });
                });*/
            });

            // Check if there are no hanging requests
            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
