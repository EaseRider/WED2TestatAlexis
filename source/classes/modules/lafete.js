/**
 * Created by Galaxus on 22.10.2015.
 */

define(['angular', 'app/controllers/EventListController'],
    function(Angular, EventListController) {
        'use strict';
        var Lafete = Angular.module('lafete', []);

        Lafete.controller('EventListController', EventListController);
        EventListController.$inject = ['$scope'];
        return Lafete;
});
