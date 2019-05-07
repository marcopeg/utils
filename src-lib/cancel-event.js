
const cancelEvent = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
}

module.exports = cancelEvent
