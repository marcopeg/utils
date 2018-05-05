"use strict";

var cancelEvent = function cancelEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
};

module.exports = cancelEvent;