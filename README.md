<p align="center">
  <img alt="slug-logo" src="https://user-images.githubusercontent.com/15306309/57985116-b6cb1d80-7a39-11e9-9384-39b381241f15.jpg" width="200">
</p>

<h1 align="center">languid</h1>

<p align="center">
  <a href="https://coveralls.io/github/otaviopace/languid?branch=master">
    <img alt="coverage-badge" src="https://coveralls.io/repos/github/otaviopace/languid/badge.svg?branch=master">
  </a>
  <a href="https://travis-ci.org/otaviopace/languid">
    <img src="https://travis-ci.org/otaviopace/languid.svg?branch=master">
  </a>
</p>


<p align="center">
  A simple web framework, made for REST/JSON APIs
</p>

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
