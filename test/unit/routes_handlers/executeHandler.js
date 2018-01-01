const test = require('ava')
const { executeHandler } = require('../../../lib/routes_handlers')

test('executeHandler', t => {
  const languidReqMock = {
    body: {
      content: 'stuff',
    },
    headers: {
      'Content-Type': 'application/json',
    },
    query: {
      name: 'john',
    },
    method: 'GET',
    url: '/bla?name=john',
  }

  t.is(typeof executeHandler(languidReqMock), 'function', 'wrong type')
  t.is(executeHandler(languidReqMock).length, 1, 'wrong type')
})

test('executeHandler', t => {
  const languidReqMock = {
    body: {
      content: 'stuff',
    },
    headers: {
      'Content-Type': 'application/json',
    },
    query: {
      name: 'john',
    },
    method: 'GET',
    url: '/bla?name=john',
  }

  let handlerCalls = 0

  const route = {
    handler: (languidReq) => {
      handlerCalls++
      t.is(languidReq, languidReqMock, 'argument is not being passed')
      return {
        statusCode: 204,
        body: {
          stuff: 'content',
        },
      }
    },
  }

  const response = executeHandler(languidReqMock)(route.handler)

  const expectResponse = {
    statusCode: 204,
    body: {
      stuff: 'content',
    },
  }

  t.is(handlerCalls, 1, 'wrong number of `handler` calls')
  t.deepEqual(response, expectResponse, 'wrong response content')
})
