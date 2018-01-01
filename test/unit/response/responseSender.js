const test = require('ava')
const { responseSender } = require('../../../lib/response')

test('responseSender', t => {
  const httpResMock = {
    writeHead: (statusCode, headers) => {},
    write: body => {},
    end: () => {},
  }

  t.is(typeof responseSender(httpResMock), 'function', 'wrong type')
  t.is(responseSender(httpResMock).length, 1, 'wrong arity')
})

test('responseSender', t => {
  let numberOfWriteHeadCalls = 0,
    numberOfWriteCalls = 0,
    numberOfEndCalls = 0

  const httpResMock = {
    writeHead: (statusCode, headers) => {
      numberOfWriteHeadCalls++
    },
    write: body => {
      numberOfWriteCalls++
    },
    end: () => {
      numberOfEndCalls++
    },
  }

  const builtResponse = {
    statusCode: 500,
    headers: {
      a: 'header',
      'Content-Type': 'application/json',
      'X-Powered-By': 'languid',
    },
    body: JSON.stringify({
      stuff: 'content',
    }),
  }

  responseSender(httpResMock)(builtResponse)

  t.is(numberOfWriteCalls, 1, 'wrong number of `write` calls')
  t.is(numberOfWriteHeadCalls, 1, 'wrong number of `writeHead` calls')
  t.is(numberOfEndCalls, 1, 'wrong number of `end` calls')
})

test('responseSender', t => {
  let numberOfWriteHeadCalls = 0,
    numberOfWriteCalls = 0,
    numberOfEndCalls = 0

  const httpResMock = {
    writeHead: (statusCode, headers) => {
      numberOfWriteHeadCalls++
    },
    write: body => {
      numberOfWriteCalls++
    },
    end: () => {
      numberOfEndCalls++
    },
  }

  const builtResponse = {
    statusCode: undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Powered-By': 'languid',
    },
    body: JSON.stringify({}),
  }

  try {
    responseSender(httpResMock)(builtResponse)
  } catch (error) {
    t.is(error.name, 'Error')
    t.is(
      error.message,
      'statusCode has not been set, connection hangup'
    )
  }

  t.is(numberOfWriteCalls, 0, 'wrong number of `write` calls')
  t.is(numberOfWriteHeadCalls, 0, 'wrong number of `writeHead` calls')
  t.is(numberOfEndCalls, 0, 'wrong number of `end` calls')
})
