const test = require('ava')
const { EventEmitter } = require('events')
const { httpHandler } = require('../../../lib/server')

test('httpHandler', t => {
  const onDataEndMock = (req, res, routes) => {}

  const result = httpHandler(onDataEndMock)

  t.is(typeof result, 'function', 'wrong type')
  t.is(result.length, 1, 'wrong arity')
})

test('httpHandler', t => {
  const onDataEndMock = (req, res, routes) => {}

  const routes = []

  const result = httpHandler(onDataEndMock)(routes)

  t.is(typeof result, 'function', 'wrong type')
  t.is(result.length, 2, 'wrong arity')
})

test('httpHandler', t => {
  const httpReqMock = new EventEmitter()

  const httpResMock = {
    stuff: true,
  }

  const routes = []

  const dataBuffer = Buffer('{"data":"content"}')

  let onDataEndCalls = 0
  const onDataEndMock = (req, res, routes) => {
    onDataEndCalls++

    t.deepEqual(req, httpReqMock, 'wrong parameter')
    t.deepEqual(req.body, [dataBuffer], 'wrong value')
    t.deepEqual(res, httpResMock, 'wrong parameter')
    t.deepEqual(routes, [], 'wrong parameter')
  }

  httpHandler(onDataEndMock)(routes)(httpReqMock, httpResMock)

  httpReqMock.emit('data', dataBuffer)
  httpReqMock.emit('end')

  t.is(onDataEndCalls, 1, 'wrong number of calls of `onDataEnd`')
})
