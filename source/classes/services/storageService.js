/**
 * Created by Galaxus on 29.10.2015.
 */
define(['app/model/event'], function(Event) {
    'use strict';
    var StorageService = function() {
        this.events = [new Event(
            'Simons birthday',
            'The greatest birthday party simon ever had',
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
            }, null),
            new Event(
                'Big Party',
                'The greatest birthday party simon ever had',
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
                }, null),
            new Event(
                'Car Viewing',
                'The greatest birthday party simon ever had',
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
                }, null)
        ];
    }
    return StorageService;
});