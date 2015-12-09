/**
 * Created by Galaxus on 09.12.2015.
 */
define(['app/model/event'], function (Event) {
    'use strict';
    var EventRepository = function ($http) {
        this.urls = {
            all: '/api/events/{eventId}/guests',
            get: '/api/events/{eventId}/guests/{guestId}',
            add: '/api/events/{eventId}/guests'
        };

        this.all = function(eventID, successCallback) {
            $http.get(this.urls.all.replace('{eventId}', eventID))
                .success(function(data){
                    var guests;
                    if (data && data.events) {
                        guests = data.guests.map(function (eventDTO) {
                            return Guest.createFromDTO(eventDTO);
                        });
                    } else {
                        guests = [];
                    }
                    successCallback(guests);
                })
                .error(function(data) {
                    if (1==1) {}
                });
        };

        this.get = function(eventID, guestID, successCallback) {
            $http.get(this.urls.get.replace('{eventId}', eventID))
                .success(function(data){
                    var event = Event.createFromDTO(data);
                    successCallback(event);
                })
                .error(function(data){});
        };

        this.add = function(event, successCallback, errorCallback) {
            return $http.post(this.urls.add, JSON.stringify(event))
                .success(function(data) {
                    var event = Event.createFromDTO(data);
                    successCallback(event);
                })
                .error(function(message) {
                    errorCallback(message);
                });
        };
    }
    return EventRepository;
});