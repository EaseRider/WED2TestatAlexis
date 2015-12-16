/**
 * Created by Galaxus on 09.12.2015.
 */
define(['app/model/guest'], function (Guest) {
    'use strict';
    var GuestRepository = function ($http) {
        this.urls = {
            all: '/api/events/{eventId}/guests',
            get: '/api/events/{eventId}/guests/{guestId}',
            add: '/api/events/{eventId}/guests'
        };

        this.all = function(eventID, successCallback) {
            $http.get(this.urls.all.replace('{eventId}', eventID))
                .success(function(data){
                    var guests;
                    if (data && data.guests) {
                        guests = data.guests.map(function (eventDTO) {
                            return Guest.createFromDTO(eventDTO);
                        });
                    } else {
                        guests = [];
                    }
                    successCallback(guests);
                })
                .error(function(data) {
                });
        };

        this.get = function(eventID, guestID, successCallback) {
            $http.get(this.urls.get.replace('{eventId}', eventID).replace('{guestId}', guestID))
                .success(function(data){
                    var guest = Guest.createFromDTO(data);
                    successCallback(guest);
                })
                .error(function(data){});
        };

        this.add = function(eventID, guest, successCallback, errorCallback) {
            return $http.post(this.urls.add.replace('{eventId}', eventID), JSON.stringify(guest))
                .success(function(data) {
                    var guest = Guest.createFromDTO(data);
                    successCallback(guest);
                })
                .error(function(message) {
                    if (errorCallback)
                        errorCallback(message);
                });
        };
    }
    return GuestRepository;
});