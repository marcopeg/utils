'use strict';

function error() {
    console.error('error >>', Object.assign({}, arguments)); // eslint-disable-line
}

module.exports = error;