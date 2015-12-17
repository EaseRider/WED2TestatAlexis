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
                /*$httpBackend.when('GET', eventRepository.urls.all).respond({
                    events: [{id: 1, name: 'Dinner'}, {id: 2, name: 'Lunch'}]
                });
                /*$httpBackend.when('GET', eventRepository.urls.get.replace('{eventId}', uuid)).respond({
                    id: uuid, name: 'Dinner'
                });*/
                   /* $httpBackend.when('GET', '/api/events').respond(function (method, url, data){
                        console.log('Do something');
                        return [200, {}, {}];
                });*/
                var events = {};
                events[event.id] = event;

                $httpBackend.when('GET', /\/api\/events\/?.*/)
                    .respond(function(method, url, data, headers) {
                        var args = url.match(/\/api\/events\/(.+)/m);
                        if (!args) {
                            return [200, {events: [{id: 1, name: 'Dinner'}, {id: 2, name: 'Lunch'}]}];
                        } else {
                            console.log('some Data', url, args);
                            console.log('First Arg: ', args[1]);
                            return [200, events[args[1]]];
                        }
                    });
                //$httpBackend.when('GET', eventRepository.urls.get.replace('{eventId}', 'not-existing-uuid')).respond(null);
                $httpBackend.when('POST', eventRepository.urls.add).respond(function(method, url, data, headers) {
                    return [200, {event: event}];
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
                        },
                            function (error) {
                                console.log('Error');
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
                    $httpBackend.flush();
                    expect(events).toEqual(jasmine.any(Array));
                    expect(events.length).toEqual(0);
                });
            });

            describe('add()', function () {
                it('inserts element', function () {
                    var insEvent = EventFactory.createEvent();
                    $httpBackend.expectGET(eventRepository.urls.get.replace('{eventId}', insEvent.id)).respond(null);
                    $httpBackend.expectPOST(eventRepository.urls.add).respond(insEvent);
                    var eventResult;
                    eventRepository.add(insEvent, function(event){
                        eventResult = event;
                    });
                    $httpBackend.flush();
                    expect(eventResult).toEqual(insEvent);
                });

                describe('same element again', function () {
                    var size, status2;
                    // TODO

                    beforeEach(function () {
                        //size = eventRepository.events.length;
                        eventRepository.all(function(events) {
                            size = events.length;
                        });
                        $httpBackend.flush();
                        status2 = eventRepository.add(event);
                    });

                    it('doesn\'t affect repository size', function () {
                        var chkSize;
                        eventRepository.all(function(events) {
                            chkSize = events.length;
                        });
                        $httpBackend.flush();
                        expect(chkSize).toBeGreaterThan(0);
                        expect(chkSize).toBe(size);
                    });

                    it('returns false', function () {
                        expect(status2).toBe(true);
                    });
                });
            });

            // Check if there are no hanging requests
            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
