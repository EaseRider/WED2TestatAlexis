/**
 * Created by Galaxus on 19.11.2015.
 */
define(['app/model/event'], function (Event) {
    'use strict';

    var EventFactory = {
        createEvent: function() {
            return new Event(
                    'Simons birthday',
                    'The greatest birthday party simon ever had',
                    'Friends of Simon',
                    'drinks, cake, salad or snacks',
                    {
                        name: 'Simons house',
                        street: 'Main street 5',
                        zipCode: 8000,
                        city: 'Zurich'
                    },
                    {
                        begin: new Date('2015-10-10T18:00:00.000Z'),
                        end: new Date('2015-10-11T02:00:00.000Z')
                    },
                    null
                );
        },
        createEventWithID: function(id) {
            return new Event(
                'Simons birthday',
                'The greatest birthday party simon ever had',
                'Friends of Simon',
                'drinks, cake, salad or snacks',
                {
                    name: 'Simons house',
                    street: 'Main street 5',
                    zipCode: 8000,
                    city: 'Zurich'
                },
                {
                    begin: new Date('2015-10-10T18:00:00.000Z'),
                    end: new Date('2015-10-11T02:00:00.000Z')
                },
                null,
                id ? id : 'a91cf326-fd89-4141-800b-348f6b6c1dfc'
            );
        }
    };

    return EventFactory;
});