/**
 * Created by Galaxus on 29.10.2015.
 */
define(['app/model/event'], function(Event) {
    'use strict';
    var StorageService = function() {

        this.events = new (function() {
            var eventList = {};

            /**
             * Find event by identifier
             *
             * @param string identifier
             * @return Event or null
             */
            this.get = function(identifier) {
                for (var event in eventList) {
                    if (eventList[event].id == identifier) {
                        return eventList[event];
                    }
                }
                return null;
            };
            /**
             * Get all events
             *
             * @return Event[]
             */
            this.all = function() {
                var output = [];
                for (var event in eventList) {
                    output.push(eventList[event]);
                }
                console.log("All Called");
                return output;
            };
            /**
             * Add event if not already in list
             * @param Event event
             * @return boolean if added successfull
             */
            this.add = function(event) {
                    eventList[event.id]=event;
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
            },null,
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
                },null,
                {
                    begin: new Date('2015-10-10T18:00:00.000Z'),
                    end: new Date('2015-10-11T02:00:00.000Z')
                }, null));
    }
    return StorageService;
});