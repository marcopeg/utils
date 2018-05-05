
function debug() {
    console.log('debug >>', Object.assign({}, arguments)); // eslint-disable-line
}

module.exports = debug;