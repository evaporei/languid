const test = require('ava')
const { responseBuilder } = require('../../../lib/response')

test('responseBuilder', t => {
  const languidResMock = {
    statusCode: 500,
    headers: {
      a: 'header',
    },
    body: {
      stuff: 'content',
    },
  }

  const response = responseBuilder(languidResMock)

  const expectResponse = {
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

  t.deepEqual(response, expectResponse, 'wrong content')
})

test('responseBuilder', t => {
  const languidResMock = {}

  const response = responseBuilder(languidResMock)

  const expectResponse = {
    statusCode: undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Powered-By': 'languid',
    },
    body: JSON.stringify({}),
  }

  t.deepEqual(response, expectResponse, 'wrong content')
})
