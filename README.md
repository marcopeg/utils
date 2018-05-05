# utils
Javascript utils for server and client projects

## cancelEvent

```
const cancelEvent = require('@marcopeg/utils/lib/cancel-event)

// use it as simple function with an event as argument
const onClick = (evt) => {
    cancelEvent(evt)
    ...
    my handler code
}

// @TODO: use it as middleware
const onClick = cancelEvent((evt) => {
    ... my handler
})
```


## config

```
const config = require('@marcopeg/utils/lib/config)

// will trigger an error if the env variable is not defined
const serverPort = config.get('SERVER_PORT')

// will return a default vailue if the env variable is not defined
const appName = config.get('APP_NAME', 'Default App Name')

// (process.env.NODE_ENV === 'development')
if (config.isDev()) {
    ...
}
```

## getErrorOrigin

Improve errors stack trace


## pause

```
const pause = require('@marcopeg/utils/lib/pause)

async function foo () {
    console.log('before')
    await pause(2000) // stop process for 2s
    console.log('after')
}
```

## truncate

```
const truncate = require('@marcopeg/utils/lib/truncate)

truncate('123456789', 5, '...')
-> 1...9
```