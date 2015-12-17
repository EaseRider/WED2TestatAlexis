/**
 * Created by Galaxus on 19.11.2015.
 */
define(['app/model/guest'], function (Guest) {
    'use strict';
    var GuestFactory = {
        createGuest: function() {
           return new Guest(
               'Martin',
               'Schoggichueche',
               'Ich chumme',
               false
                );
    },
        createGuestWithID: function(id) {
            var guest = new Guest(
                'Martin',
                'Schoggichueche',
                'Ich chumme',
                false,
                id
            );
            return guest;
        }
    };

    return GuestFactory;
});