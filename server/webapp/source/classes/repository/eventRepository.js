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
                .error(function(data){});
        };

        this.add = function(event, successCallback) {
            console.log("Thest Add function");
            return $http.post(this.urls.add, JSON.stringify(event))
                .success(function(data) {
                    var event = Event.createFromDTO(data.event);
                    successCallback(event);
                });
        };
    }
    return EventRepository;
});