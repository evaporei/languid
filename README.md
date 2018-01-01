# languid
[![Coverage Status](https://coveralls.io/repos/github/otaviopace/languid/badge.svg?branch=master)](https://coveralls.io/github/otaviopace/languid?branch=master)
[![Build Status](https://travis-ci.org/otaviopace/languid.svg?branch=master)](https://travis-ci.org/otaviopace/languid)

A simple web framework, made for REST/JSON APIs

## Installation

`npm install --save languid`

## Usage

```javascript
const languid = require('languid')
const Promise = require('bluebird')

const app = languid()

app.get('/', req => {
  console.log(req.headers)
  console.log(req.body)
  console.log(req.query)
  // the return of the promise chain
  // will be the response
  return Promise.resolve({
    statusCode: 200,
    headers: {
      stuff:'content',
    },
    body: {
      ok: 'ok',
    },
  })
})

app.post('/dino', req => {
  console.log(req.headers)
  console.log(req.body)
  console.log(req.query)
  return Promise.resolve({
    statusCode: 201,
    body: req.body,
  })
    .then(response => {
      throw new Error()
    })
    .catch(error => {
      // this will be the new response
      return {
        statusCode: 500,
        body: {
          message: 'Internal Server Error',
        },
      }
    })
})

app.post('/bla', req => {
  console.log(req.headers)
  console.log(req.body)
  console.log(req.query)
  return Promise.resolve({
    statusCode: 404,
    body: {
      got: 'bla',
    },
  })
})

app.listen(8000)
```
