
function info() {
    console.log('info >>', Object.assign({}, arguments)); // eslint-disable-line
}

module.exports = info;