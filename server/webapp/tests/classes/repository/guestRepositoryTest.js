/**
 * Created by Galaxus on 17.12.2015.
 */
define(['app/model/guest', 'app/repository/guestRepository', 'tests/factories/guestFactory', 'libraries/angularMocks', 'app/services/uuidService'],
    function (guest, GuestRepository, GuestFactory, AngularMocks, UUIDService) {
        'use strict';

        describe('GuestRepository test suite', function () {
            var guestRepository, guest, $http, $httpBackend;
            var uuid = UUIDService.getRandomUuid();

            // setup
            beforeEach(AngularMocks.inject(function ($injector) {
                $http = $injector.get('$http');
                $httpBackend = $injector.get('$httpBackend');

                guestRepository = new GuestRepository($http);
                guest = GuestFactory.createGuestWithID(uuid);


                var guests = {};
                guests[guest.id] = guest;

                $httpBackend.when('GET', /\/api\/events\/1\/guests\/?.*/)
                    .respond(function(method, url, data, headers) {
                        var args = url.match(/\/api\/events\/1\/guests\/(.+)/m);
                        if (!args) {
                            return [200, {guests: [{id: 1, name: 'Hans'}, {id: 2, name: 'Peter'}]}];
                        } else {
                            console.log('some Data', url, args);
                            console.log('First Arg: ', args[1]);
                            return [200, guests[args[1]]];
                        }
                    });
                //$httpBackend.when('GET', eventRepository.urls.get.replace('{eventId}', 'not-existing-uuid')).respond(null);
                $httpBackend.when('POST', guestRepository.urls.add).respond(function(method, url, data, headers) {
                    return [200, {guest: guest}];
                });
            }));

            describe('get()', function () {
                beforeEach(function () {
                    //eventRepository.events.add(event);
                });

                describe('by object id', function () {

                    it('returns the object', function () {
                        var guest;
                        guestRepository.get(1, uuid, function (guestResult) {
                            guest = guestResult;
                        });
                        $httpBackend.flush();
                        expect(guest).not.toBe(null);
                        expect(guest.id).toBe(uuid);
                    });
                });

                describe(1, 'by inexistent object id', function () {
                    it('returns null', function () {
                        var guest;
                        guestRepository.get('not-existing-uuid', function (guestResult) {
                                guest = guestResult;
                            },
                            function (error) {
                                console.log('Error');
                            });
                        $httpBackend.flush();
                        expect(guest).toBeNull();
                    });
                });
            });


            describe('all()', function () {
                it('returns an Array', function () {
                    var guests = null;
                    guestRepository.all(function (guestList) {
                        guests = guestList;
                    });
                    // Mock ajax channel needs to be flushed (calls needs to be fired) befor check
                    $httpBackend.flush();
                    expect(guests).toEqual(jasmine.any(Array));
                });

                it('returns two guests', function () {
                    var guests = null;
                    guestRepository.all(function (guestList) {
                        guests = guestList;
                    });
                    $httpBackend.flush();
                    expect(guests.length).toBe(2);
                });

                it('returns real javascript objects', function() {
                    var guests = null;
                    guestRepository.all(function(guestList) {
                        guests = guestList;
                    });
                    $httpBackend.flush();
                    expect(guests[0]).toEqual(jasmine.any(Guest));
                    expect(guests[1]).toEqual(jasmine.any(Guest));
                });

                it('no Objects empty Array', function() {
                    $httpBackend.expectGET(guestRepository.urls.all).respond(null);
                    var guests = null;
                    guestRepository.all(function(guestList) {
                        guests = guestList;
                    });
                    $httpBackend.flush();
                    expect(guests).toEqual(jasmine.any(Array));
                    expect(guests.length).toEqual(0);
                });
            });

            describe('add()', function () {
                it('inserts element', function () {
                    var insGuest = GuestFactory.createGuest();
                    $httpBackend.expectGET(guestRepository.urls.get.replace('{guestId}', insGuest.id)).respond(null);
                    $httpBackend.expectPOST(guestRepository.urls.add).respond(insGuest);
                    var guestResult;
                    guestRepository.add(insGuest, function(guest){
                        guestResult = guest;
                    });
                    $httpBackend.flush();
                    expect(guestResult).toEqual(insGuest);
                });

                describe('same element again', function () {
                    var size, status2;
                    // TODO

                    beforeEach(function () {
                        //size = eventRepository.events.length;
                        guestRepository.all(function(guests) {
                            size = guests.length;
                        });
                        $httpBackend.flush();
                        status2 = guestRepository.add(guest);
                    });

                    it('doesn\'t affect repository size', function () {
                        var chkSize;
                        guestRepository.all(function(guests) {
                            chkSize = guests.length;
                        });
                        $httpBackend.flush();
                        expect(chkSize).toBeGreaterThan(0);
                        expect(chkSize).toBe(size);
                    });

                    it('returns false', function () {
                        expect(status2).toBe(true);
                    });
                });
            });

            // Check if there are no hanging requests
            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });