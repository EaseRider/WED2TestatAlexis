/**
 * Created by Galaxus on 29.10.2015.
 */

define(['app/services/uuidService'], function(UUIDService) {
    'use strict';
    var Event = function(name, description, targetGroup, eventGift, location, times, maximalAmountOfGuests, id) {
        this.name = name;
        this.description = description;
        this.targetGroup = targetGroup;
        this.eventGift = eventGift;
        this.location = location;
        this.times = times;
        this.maximalAmountOfGuests = maximalAmountOfGuests || null;
        this.id = id || UUIDService.getRandomUuid();

        Object.defineProperty(this, 'begin', {
           get: function () {
               return this.times.begin;
           },
            set: function(begin) {
                this.times.begin = begin;
            }
        });
        Object.defineProperty(this, 'end', {
            get: function () {
                return this.times.end;
            },
            set: function(end) {
                this.times.end = end;
            }
        });
    };


    /**
     * Create Event object from data transfer object (json object)
     */
    //name, description, targetGroup, eventGift, location, preparation, event, maximalAmountOfGuests, id
    Event.createFromDTO = function(jsonData) {
        if (jsonData != null) {
            return new Event(
                jsonData.name,
                jsonData.description,
                jsonData.targetGroup,
                jsonData.eventGift,
                jsonData.location,
                //jsonData.preparation,
                jsonData.times,
                //jsonData.times,
                jsonData.maximalAmoutOfGuests,
                jsonData.id
            );
        } else {
            return null;
        }
    };

    return Event;
});


