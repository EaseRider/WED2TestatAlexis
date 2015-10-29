/**
 * Created by Galaxus on 29.10.2015.
 */

define([], function() {
    'use strict';
    var Event = function(name, description, targetGroup, eventGift, location, preparation, event, maximalAmountOfGuests) {
        this.name = name;
        this.description = description;
        this.targetGroup = targetGroup;
        this.eventGift = eventGift;
        this.location = location;
        this.preparation = preparation;
        this.event = event;
        this.maximalAmountOfGuests = maximalAmountOfGuests;
        Object.defineProperty(this, 'begin', {
           get: function () {
               return this.event.begin;
           },
            set: function(begin) {
                this.event.begin = begin;
            }
        });
        Object.defineProperty(this, 'end', {
            get: function () {
                return this.event.end;
            },
            set: function(end) {
                this.event.end = end;
            }
        });
        Object.defineProperty(this, 'preparationEnd', {
            get: function () {
                return this.preparation.end;
            },
            set: function(end) {
                this.preparation.end = end;
            }
        });
        Object.defineProperty(this, 'preparationBegin', {
            get: function () {
                return this.preparation.begin;
            },
            set: function(begin) {
                this.preparation.end = begin;
            }
        });
    };
    return Event;
});


