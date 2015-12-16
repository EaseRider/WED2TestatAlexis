/**
 * Created by Galaxus on 08.12.2015.
 */

define(['app/services/uuidService'], function(UUIDService) {
    'use strict';

    var Guest = function(name, contribution, comment, canceled, id) {
        if(name !== undefined) {
            this.name = name;
            this.contribution = contribution;
            this.comment = comment;
            this.canceled = canceled ? true : false;

            this.id = id || UUIDService.getRandomUuid();
        } else {
            Guest.call(this, '', '', '', false);
        }
    };


    /**
     * Create Guest object from data transfer object (json object)
     */
    Guest.createFromDTO = function(jsonData) {
        if (jsonData != null) {
            return new Guest(
                jsonData.name,
                jsonData.contribution,
                jsonData.comment,
                jsonData.canceled,
                jsonData.id
            );
        } else {
            return null;
        }
    };

    return Guest;
});
