const test = require('ava')
const { createLanguidReq } = require('../../../lib/request')

test('createLanguidReq', t => {
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

  const languidReq = createLanguidReq(httpReqMock)

  t.is(typeof languidReq, 'object', 'wrong type')
})

test('createLanguidReq', t => {
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

  const languidReq = createLanguidReq(httpReqMock)

  const expectedLanguidReq = {
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

  t.deepEqual(languidReq, expectedLanguidReq, 'wrong content')
})
