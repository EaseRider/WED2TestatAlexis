/**
 * Created by Galaxus on 29.10.2015.
 */
define(['app/model/event'], function (Event) {
    'use strict';

    describe('Event test suite', function() {
        var event;

        // setup
        beforeEach(function() {
            event = new Event(
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
                null,
                {
                    begin: new Date('2015-10-10T18:00:00.000Z'),
                    end: new Date('2015-10-11T02:00:00.000Z')
                },
                null
            );
        });

        it('Expects changed event begin on set begin', function() {
            expect(event.begin)
                .toEqual(new Date('2015-10-10T18:00:00.000Z'));
            event.begin = new Date('2015-10-10T20:00:00.000Z');
            expect(event.begin)
                .toEqual(new Date('2015-10-10T20:00:00.000Z'));
        });

        it('Expects changed event end on set end', function() {
            expect(event.end)
                .toEqual(new Date('2015-10-11T02:00:00.000Z'));
            event.end = new Date('2015-10-11T04:00:00.000Z');
            expect(event.end)
                .toEqual(new Date('2015-10-11T04:00:00.000Z'));
        });
    });
});
