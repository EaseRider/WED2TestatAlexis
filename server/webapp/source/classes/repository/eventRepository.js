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

        this.all = function(successCallback, errorCallback) {
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
                    errorCallback(data);
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

        this.add = function(event, successCallback, errorCallback) {
            this.get(event.id, function (data) {

            })
                return $http.post(this.urls.add, JSON.stringify(event))
                    .success(function (data) {
                        var event = Event.createFromDTO(data);
                        successCallback(event);
                    })
                    .error(function (message) {
                        if (errorCallback)
                            errorCallback(message);
                    });

        };
    }
    return EventRepository;
});