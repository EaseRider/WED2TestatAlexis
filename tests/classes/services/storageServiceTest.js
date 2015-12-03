/**
 * Created by Galaxus on 12.11.2015.
 */
// tests/classes/services/storageServiceTest.js

define(['app/model/event', 'app/services/storageService', 'app/services/uuidService'], function (Event, StorageService, UUIDService) {
    'use strict';

    describe('EventStorageService test suite', function() {
        var event, storageService;
        var uuid = UUIDService.getRandomUuid();

        // setup
        beforeEach(function() {
            storageService = new StorageService();
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
                null,
                uuid
            );
        });

        describe('get()', function() {
            beforeEach(function() {
                storageService.events.add(event);
            });

            describe('by object id', function() {
                it('returns the object', function() {
                    var findEvent = storageService.events.get(uuid);
                    expect(findEvent).not.toBe(null);
                    expect(findEvent.id).toBe(uuid);
                });
            });

            describe('by inexistent object id', function() {
                it('returns null', function() {
                    var findEvent = storageService.events.get("asdf-asdf-asdf-asfd-asfd");
                    expect(findEvent).toBeNull();
                });
            });
        });


        describe('all()', function() {
            it('returns an Array', function() {
                var findEvents = storageService.events.all();
                expect(findEvents).toBeDefined();
            });
        });

        describe('add()', function() {
            it('inserts element', function() {
                storageService.events.add(event);
                var getEvent = storageService.events.get(event.id);
                expect(getEvent).toEqual(event);
            });

            describe('same element again', function() {
                // TODO

                beforeEach(function() {
                    // TODO
                });

                it('doesn\'t affect repository size', function() {
                    expect(false).toBe(true);
                });

                it('returns false', function() {
                    expect(false).toBe(true);
                    // TODO
                });
            });
        });
    });
});
