"use strict";

var pause = async function pause(time) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, time);
    });
};

module.exports = pause;