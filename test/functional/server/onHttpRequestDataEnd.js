const test = require('ava')
const Promise = require('bluebird')
const { onHttpRequestDataEnd } = require('../../../lib/server')

test('onHttpRequestDataEnd', t => {
  const httpReqMock = {
    body: [Buffer(JSON.stringify({
      content: 'stuff',
    }))],
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    url: '/bla?name=john',
  }

  let numberOfWriteHeadCalls = 0,
    numberOfWriteCalls = 0,
    numberOfEndCalls = 0

  const httpResMock = {
    writeHead: (statusCode, headers) => {
      t.is(statusCode, 501, 'wrong statusCode')
      t.is(headers['Content-Type'], 'application/json', 'wrong header')
      t.is(headers['X-Powered-By'], 'languid', 'wrong header')

      numberOfWriteHeadCalls++
    },
    write: body => {
      t.deepEqual(body, JSON.stringify({}), 'wrong content')
      numberOfWriteCalls++
    },
    end: () => {
      numberOfEndCalls++
    },
  }

  const routes = []

  return onHttpRequestDataEnd(httpReqMock, httpResMock, routes)
    .then(() => {
      t.is(
        numberOfWriteHeadCalls,
        1,
        'wrong number of `writeHead` calls'
      )
      t.is(
        numberOfWriteCalls,
        1,
        'wrong number of `write` calls'
      )
      t.is(
        numberOfEndCalls,
        1,
        'wrong number of `end` calls'
      )
    })
    .catch(t.fail)
})

test('onHttpRequestDataEnd', t => {
  const httpReqMock = {
    body: [Buffer(JSON.stringify({
      content: 'stuff',
    }))],
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    url: '/bla?name=john',
  }

  let numberOfWriteHeadCalls = 0,
    numberOfWriteCalls = 0,
    numberOfEndCalls = 0

  const httpResMock = {
    writeHead: (statusCode, headers) => {
      t.is(statusCode, 501, 'wrong statusCode')
      t.is(headers['Content-Type'], 'application/json', 'wrong header')
      t.is(headers['X-Powered-By'], 'languid', 'wrong header')

      numberOfWriteHeadCalls++
    },
    write: body => {
      t.deepEqual(body, JSON.stringify({}), 'wrong content')
      numberOfWriteCalls++
    },
    end: () => {
      numberOfEndCalls++
    },
  }

  const routes = [{
    path: '/jam',
    method: 'get',
  }]

  return onHttpRequestDataEnd(httpReqMock, httpResMock, routes)
    .then(() => {
      t.is(
        numberOfWriteHeadCalls,
        1,
        'wrong number of `writeHead` calls'
      )
      t.is(
        numberOfWriteCalls,
        1,
        'wrong number of `write` calls'
      )
      t.is(
        numberOfEndCalls,
        1,
        'wrong number of `end` calls'
      )
    })
    .catch(t.fail)
})

test('onHttpRequestDataEnd', t => {
  const httpReqMock = {
    body: [Buffer(JSON.stringify({
      content: 'stuff',
    }))],
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    url: '/bla?name=john',
  }

  let numberOfWriteHeadCalls = 0,
    numberOfWriteCalls = 0,
    numberOfEndCalls = 0

  const httpResMock = {
    writeHead: (statusCode, headers) => {
      t.is(statusCode, 200, 'wrong statusCode')
      t.is(headers['Content-Type'], 'application/json', 'wrong header')
      t.is(headers['X-Powered-By'], 'languid', 'wrong header')
      t.is(headers.a, 'header', 'wrong header')

      numberOfWriteHeadCalls++
    },
    write: body => {
      t.deepEqual(
        body,
        JSON.stringify({a: 'lot of content'}),
        'wrong content'
      )
      numberOfWriteCalls++
    },
    end: () => {
      numberOfEndCalls++
    },
  }

  const routes = [{
    path: '/bla',
    method: 'get',
    handler: req => Promise.resolve({
      statusCode: 200,
      headers: {
        a: 'header',
      },
      body: {
        a: 'lot of content',
      },
    })
  }]

  return onHttpRequestDataEnd(httpReqMock, httpResMock, routes)
    .then(() => {
      t.is(
        numberOfWriteHeadCalls,
        1,
        'wrong number of `writeHead` calls'
      )
      t.is(
        numberOfWriteCalls,
        1,
        'wrong number of `write` calls'
      )
      t.is(
        numberOfEndCalls,
        1,
        'wrong number of `end` calls'
      )
    })
    .catch(t.fail)
})

test('onHttpRequestDataEnd', t => {
  const httpReqMock = {
    body: [Buffer(JSON.stringify({
      content: 'stuff',
    }))],
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    url: '/bla?name=john',
  }

  let numberOfWriteHeadCalls = 0,
    numberOfWriteCalls = 0,
    numberOfEndCalls = 0

  const httpResMock = {
    writeHead: (statusCode, headers) => {
      t.is(statusCode, 200, 'wrong statusCode')
      t.is(headers['Content-Type'], 'application/json', 'wrong header')
      t.is(headers['X-Powered-By'], 'languid', 'wrong header')
      t.is(headers.a, 'header', 'wrong header')

      numberOfWriteHeadCalls++
    },
    write: body => {
      t.deepEqual(
        body,
        JSON.stringify({a: 'lot of content'}),
        'wrong content'
      )
      numberOfWriteCalls++
    },
    end: () => {
      numberOfEndCalls++
    },
  }

  const routes = [
    {
      path: '/jam',
      method: 'get',
    },
    {
      path: '/bla',
      method: 'get',
      handler: req => Promise.resolve({
        statusCode: 200,
        headers: {
          a: 'header',
        },
        body: {
          a: 'lot of content',
        },
      })
    },
  ]

  return onHttpRequestDataEnd(httpReqMock, httpResMock, routes)
    .then(() => {
      t.is(
        numberOfWriteHeadCalls,
        1,
        'wrong number of `writeHead` calls'
      )
      t.is(
        numberOfWriteCalls,
        1,
        'wrong number of `write` calls'
      )
      t.is(
        numberOfEndCalls,
        1,
        'wrong number of `end` calls'
      )
    })
    .catch(t.fail)
})
