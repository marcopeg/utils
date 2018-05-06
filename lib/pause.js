"use strict";

var pause = function pause(time) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, time);
    });
};

module.exports = pause;