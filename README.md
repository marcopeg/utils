# utils
This is an opinionated set of personal javascript utilities that I
use to share from project to project and I'm tired to copy over.

Why?

**Point n.1:** Many great libraries have huge footprint. Here I aim
for the barebone and allow to cherry pick each module seapratedly.

**Point n.2:** Sometimes it's just faster to DIY. I plan to keep
this library as a personal API and implement the functions with better
open source libraries if/when I find them.

**Point n.3:** If Facebook does it (fbjs), why shouldn't I? :-)

**Point n.4:** No backward compatibility. I target NodeJS from version
9.x and modern web browsers. There is no transpilation that will bloat the code.

# Modules

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

**INIT:** working with ParcelJS I came across a glitch. ParcelJS does
not populate the "process.env" like in Webpack (or NodeJS) and yoo must
access the variable by writing the full "process.env.VAR_NAME" in the code
which I believe is then substituted with the value itself.

To make `config` compatible you need to initialize it with all the "hard coded"
values:

```
const config = require('@marcopeg/utils/lib/config)
config.init({
    NODE_ENV: process.env.NODE_ENV,
    NOT_DEFINED: process.env.NOT_DEFINED, // will be "undefined"
})

console.log(config.get('NOT_DEFINED', 'default'))
//-> "default"
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

## request

Wraps isomorphic fetch with some basic utility functions.
(this can be optimized a lot)

## truncate

```
const truncate = require('@marcopeg/utils/lib/truncate)

truncate('123456789', 5, '...')
-> 1...9
```

## Logger

```
const logger = require('@marcopeg/utils/lib/logger')
logger.init()
logger.logInfo('foo)
```

**INIT:** this module needs to be initialize so to read (and cache) the
enviroment LOG_LEVEL, or to explicitly receive a log level via first param
