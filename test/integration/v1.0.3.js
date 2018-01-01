const test = require('ava')
const request = require('request-promise')
const server = require('../../examples/v1.0.3')

test('v1.0.3', t => {
  const options = {
    uri: 'http://localhost:8000/',
    method: 'GET',
    resolveWithFullResponse: true,
  }

  const expectHeaders = {
    stuff: 'content',
  }

  const expectBody = JSON.stringify({
    ok: 'ok'
  })

  return request(options)
    .then(res => {
      t.is(res.statusCode, 200, 'wrong statusCode')
      t.is(res.headers['content-type'], 'application/json', 'wrong headers')
      t.is(res.headers['x-powered-by'], 'languid', 'wrong headers')
      t.is(res.headers.stuff, 'content', 'wrong headers')
      t.is(res.body, expectBody, 'wrong body')
    })
    .catch(t.fail)
})

test('v1.0.3', t => {
  const options = {
    uri: 'http://localhost:8000/dino',
    method: 'POST',
    resolveWithFullResponse: true,
    body: {
      a: 'lot of content',
    },
    json: true,
  }

  const expectHeaders = {}

  const expectBody = {
    message: 'Internal Server Error',
  }

  return request(options)
    .then(t.fail)
    .catch(({ response: res }) => {
      t.is(res.statusCode, 500, 'wrong statusCode')
      t.is(res.headers['content-type'], 'application/json', 'wrong headers')
      t.is(res.headers['x-powered-by'], 'languid', 'wrong headers')
      t.deepEqual(res.body, expectBody, 'wrong body')
    })
})

test('v1.0.3', t => {
  const options = {
    uri: 'http://localhost:8000/bla',
    method: 'POST',
    resolveWithFullResponse: true,
    body: {
      a: 'lot of content',
    },
    json: true,
  }

  const expectHeaders = {}

  const expectBody = {
    got: 'bla'
  }

  return request(options)
    .then(t.fail)
    .catch(({ response: res }) => {
      t.is(res.statusCode, 404, 'wrong statusCode')
      t.is(res.headers['content-type'], 'application/json', 'wrong headers')
      t.is(res.headers['x-powered-by'], 'languid', 'wrong headers')
      t.deepEqual(res.body, expectBody, 'wrong body')
    })
})
