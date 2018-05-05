'use strict';

function getErrorOrigin(errorStack) {
    try {
        var tokens = errorStack.split('\n').filter(function (item) {
            return item.indexOf('_callee') !== -1;
        });
        var origin = tokens.shift().trim();
        origin = origin.substring(origin.indexOf('_callee') + 10);
        origin = origin.substring(0, origin.indexOf(')'));
        return origin;
    } catch (e) {
        return JSON.stringify(errorStack);
    }
}

module.exports = getErrorOrigin;