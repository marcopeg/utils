/* global fetch */
const pause = require('./pause')
const { isDev, get: getConfig } = require('./config')

require('es6-promise').polyfill()
require('isomorphic-fetch')

let devDelay = 0

const setDevDelay = (delay) => {
    devDelay = delay
}

// eslint-disable-next-line
const wrappedFetch = async (url, config = {}) => {
    try {
        if (isDev()) {
            await pause(devDelay)
        }
        return fetch(url, config)
    } catch (err) {
        throw err
    }
}

const getJSON = async (url, config = {}) => {
    try {
        const headers = config.headers || {}
        const res = await wrappedFetch(url, {
            ...config,
            method: 'GET',
            headers: {
                ...headers,
                'content-type': 'application/json',
            },
        })

        // status code error handling
        if (res.status !== 200) {
            let errMsg
            try {
                errMsg = await res.text()
            } catch (err) {
                errMsg = res.statusText
            }

            const error = new Error(`${res.status} - ${errMsg}`)
            error.response = res
            throw error
        }

        return await res.json()
    } catch (err) {
        throw err
    }
}

const getJSONAuth = (url, token, config = {}) => {
    const headers = config.headers || {}
    return getJSON(url, {
        ...config,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    })
}

const postJSON = async (url, data = {}, config = {}) => {
    try {
        const headers = config.headers || {}
        const res = await wrappedFetch(url, {
            ...config,
            method: 'POST',
            headers: {
                ...headers,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        // status code error handling
        if (res.status !== 200) {
            let errMsg
            try {
                errMsg = await res.text()
            } catch (err) {
                errMsg = res.statusText
            }

            const error = new Error(`${res.status} - ${errMsg}`)
            error.response = res
            throw error
        }

        return await res.json()
    } catch (err) {
        throw err
    }
}

const postJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = config.headers || {}
    return postJSON(url, data, {
        ...config,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    })
}

const putJSON = async (url, data = {}, config = {}) => {
    try {
        const headers = config.headers || {}
        const res = await wrappedFetch(url, {
            ...config,
            method: 'PUT',
            headers: {
                ...headers,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        // status code error handling
        if (res.status !== 200) {
            let errMsg
            try {
                errMsg = await res.text()
            } catch (err) {
                errMsg = res.statusText
            }

            const error = new Error(`${res.status} - ${errMsg}`)
            error.response = res
            throw error
        }

        return await res.json()
    } catch (err) {
        throw err
    }
}

const putJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = config.headers || {}
    return putJSON(url, data, {
        ...config,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    })
}

// export sub modules as part of the main function
wrappedFetch.setDevDelay = setDevDelay
wrappedFetch.getJSON = getJSON
wrappedFetch.getJSONAuth = getJSONAuth
wrappedFetch.postJSONAuth = postJSONAuth
wrappedFetch.postJSONAuth = postJSONAuth
wrappedFetch.putJSONAuth = putJSONAuth
wrappedFetch.putJSONAuth = putJSONAuth

module.exports = wrappedFetch