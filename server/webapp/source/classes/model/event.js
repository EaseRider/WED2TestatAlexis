/**
 * Created by Galaxus on 29.10.2015.
 */

define(['app/services/uuidService'], function(UUIDService) {
    'use strict';

    var Event = function(name, description, targetGroup, contributionsDescription, location, times, maximalAmountOfGuests, id) {
        if(name !== undefined) {
            this.name = name;
            this.description = description;
            this.targetGroup = targetGroup;
            this.contributionsDescription = contributionsDescription;
            this.location = location;
            this.times = times;
            this.maximalAmountOfGuests = maximalAmountOfGuests || null;
            this.guests = [];
            this.id = id || UUIDService.getRandomUuid();

            Object.defineProperty(this, 'begin', {
                get: function () {
                    return this.times.begin;
                },
                set: function (begin) {
                    this.times.begin = begin;
                }
            });
            Object.defineProperty(this, 'end', {
                get: function () {
                    return this.times.end;
                },
                set: function (end) {
                    this.times.end = end;
                }
            });
        } else {
            Event.call(this, '', '', '', '', '', {times:{"begin":'',"end":''}}, '', '');
        }
    };


    /**
     * Create Event object from data transfer object (json object)
     */
    //name, description, targetGroup, contributionsDescription, location, preparation, event, maximalAmountOfGuests, id
    Event.createFromDTO = function(jsonData) {
        if (jsonData != null) {
            var event = new Event(
                jsonData.name,
                jsonData.description,
                jsonData.targetGroup,
                jsonData.contributionsDescription,
                jsonData.location,
                //jsonData.preparation,
                jsonData.times,
                //jsonData.times,
                jsonData.maximalAmoutOfGuests,
                jsonData.id
            );
            event.guests = jsonData.guests;
            return event;
        } else {
            return null;
        }
    };

    return Event;
});


