/**
 * Created by Galaxus on 29.10.2015.
 */
define(['app/model/event', 'tests/factories/eventFactory'], function (Event, EventFactory) {
    'use strict';

    describe('Event test suite', function() {
        var event;

        // setup
        beforeEach(function() {
            event = EventFactory.createEvent();
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

        it('Expects id to be set on Event', function() {
            var eventWithID = EventFactory.createEventWithID();
            expect(eventWithID.id)
                .toEqual('a91cf326-fd89-4141-800b-348f6b6c1dfc');
        });
    });
});
