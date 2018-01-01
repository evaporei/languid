const test = require('ava')
const Promise = require('bluebird')
const { Server } = require('http')
const { createServer } = require('../../../lib/server')

test('createServer', t => {
  const onDataEndMock = (httpReq, httpRes, routes) =>
    Promise.resolve()

  const httpHandlerMock = routes => (req, res) => {}

  const result = createServer(onDataEndMock)

  t.is(typeof result(httpHandlerMock), 'function', 'wrong type')
  t.is(result(httpHandlerMock).length, 1, 'wrong type')
})

test('createServer', t => {
  const onDataEndMock = (httpReq, httpRes, routes) =>
    Promise.resolve()

  t.is(typeof createServer(onDataEndMock), 'function', 'wrong type')
  t.is(createServer(onDataEndMock).length, 1, 'wrong type')
})

test('createServer', t => {
  const onDataEndMock = (httpReq, httpRes, routes) =>
    Promise.resolve()

  const httpHandlerMock = routes => (req, res) => {}

  const routes = []

  const server = createServer(onDataEndMock)(httpHandlerMock)(routes)

  t.true(server instanceof Server, 'wrong instance')
})
