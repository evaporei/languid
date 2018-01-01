const test = require('ava')
const request = require('request-promise')
const server = require('../../examples/v1.0.3')

test('v1.0.3', t => {
  const options = {
    uri: 'http://localhost:8000/',
    method: 'GET',
    resolveWithFullResponse: true,
  }

  const expectedHeaders = {
    stuff: 'content',
  }

  const expectedBody = JSON.stringify({
    ok: 'ok'
  })

  return request(options)
    .then(res => {
      t.is(res.statusCode, 200, 'wrong statusCode')
      t.is(res.headers['content-type'], 'application/json', 'wrong headers')
      t.is(res.headers['x-powered-by'], 'languid', 'wrong headers')
      t.is(res.headers.stuff, 'content', 'wrong headers')
      t.is(res.body, expectedBody, 'wrong body')
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

  const expectedHeaders = {}

  const expectedBody = {
    message: 'Internal Server Error',
  }

  return request(options)
    .then(t.fail)
    .catch(({ response: res }) => {
      t.is(res.statusCode, 500, 'wrong statusCode')
      t.is(res.headers['content-type'], 'application/json', 'wrong headers')
      t.is(res.headers['x-powered-by'], 'languid', 'wrong headers')
      t.deepEqual(res.body, expectedBody, 'wrong body')
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

  const expectedHeaders = {}

  const expectedBody = {
    got: 'bla'
  }

  return request(options)
    .then(t.fail)
    .catch(({ response: res }) => {
      t.is(res.statusCode, 404, 'wrong statusCode')
      t.is(res.headers['content-type'], 'application/json', 'wrong headers')
      t.is(res.headers['x-powered-by'], 'languid', 'wrong headers')
      t.deepEqual(res.body, expectedBody, 'wrong body')
    })
})
