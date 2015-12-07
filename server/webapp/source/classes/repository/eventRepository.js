/**
 * Created by Galaxus on 29.10.2015.
 */
define(['app/model/event'], function (Event) {
    'use strict';
    var EventRepository = function ($http) {
        this.urls = {
            all: '/api/events',
            get: '/api/events/{eventId}',
            add: '/api/events'
        };

        this.all = function(successCallback) {
            $http.get(this.urls.all)
                .success(function(data){
                    var events;
                    if (data && data.events) {
                        events = data.events.map(function (eventDTO) {
                            return Event.createFromDTO(eventDTO);
                        });
                    } else {
                        events = [];
                    }
                    successCallback(events);
                })
                .error(function(data) {
                    if (1==1) {}
                });
        };

        this.get = function(eventID, successCallback) {
            $http.get(this.urls.get.replace('{eventId}', eventID))
                .success(function(data){
                    var event = Event.createFromDTO(data);
                    successCallback(event);
                })
                .error(function(data){

                });
        };

        this.add = function(event, successCallback) {
            return $http.post(this.urls.add, JSON.stringify(event))
                .success(function(data) {
                    var event = Event.createFromDTO(data.event);
                    successCallback(event);
                });
            /*$http.get(this.urls.add)
                .success(function(data){
                    var events = data.events.map(function(eventDTO){
                        return Event.createFromDTO(eventDTO);
                    });
                    successCallback(events);
                });*/
        };

       /* this.events = new (function () {
            var eventList = {};


            this.get = function (identifier) {
                for (var event in eventList) {
                    if (eventList[event].id == identifier) {
                        return eventList[event];
                    }
                }
                return null;
            };

            this.all = function () {
                var output = [];
                for (var event in eventList) {
                    output.push(eventList[event]);
                }
                return output;
            };

            this.add = function (event) {
                eventList[event.id] = event;
            };
        })();

        this.events.add(new Event(
            '1Simons birthday',
            '1The greatest birthday party simon ever had',
            'Friends of Simon',
            'drinks, cake, salad or snacks',
            {
                name: 'Simons house',
                street: 'Main street 5',
                zipCode: 8000,
                city: 'Zurich'
            }, null,
            {
                begin: new Date('2015-10-10T18:00:00.000Z'),
                end: new Date('2015-10-11T02:00:00.000Z')
            }, null));
        this.events.add(new Event(
            '2Big Party',
            '2The greatest birthday party simon ever had',
            'Friends of Simon',
            'drinks, cake, salad or snacks',
            {
                name: 'Simons house',
                street: 'Main street 5',
                zipCode: 8000,
                city: 'Zurich'
            },
            null,
            {
                begin: new Date('2015-10-10T18:00:00.000Z'),
                end: new Date('2015-10-11T02:00:00.000Z')
            },
            null));
        this.events.add(new Event(
            '3Car Viewing',
            '3The greatest birthday party simon ever had',
            'Friends of Simon',
            'drinks, cake, salad or snacks',
            {
                name: 'Simons house',
                street: 'Main street 5',
                zipCode: 8000,
                city: 'Zurich'
            }, null,
            {
                begin: new Date('2015-10-10T18:00:00.000Z'),
                end: new Date('2015-10-11T02:00:00.000Z')
            }, null));*/
    }
    return EventRepository;
});