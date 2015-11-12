/**
 * Created by Galaxus on 22.10.2015.
 */

define(['app/controllers/EventListController', 'frameworks/angular', 'libraries/angularMocks', 'app/services/storageService'],
    function(EventListController, Angular, AngularMocks, StorageService){
        'use strict';
        var eventListController;
        beforeEach(AngularMocks.inject(function ($rootScope) {
            var scope = $rootScope.$new();
            var storageService = new StorageService();
            eventListController = new EventListController(scope, storageService);
        }));
        describe('EventListController Suite', function() {
            describe('property scope', function() {
                it('contains 3 events', function() {
                    var scope = {};
                    //var eventListController = new EventListController(scope, storageService);
                    expect(3).toBe(eventListController.scope.events.length);
                });

                it('Each Event should have a UUID as id', function() {
                    var regex = new RegExp('[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}');
                    for (var event in eventListController.scope.events) {
                        expect(event.id).toMatch(regex);
                    }
                });
            })
        });
    });


