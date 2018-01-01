const test = require('ava')
const {
  defaultHandler,
  defineHandler,
} = require('../../../lib/routes_handlers')

test('defineHandler', t => {
  const route = {
    method: 'get',
    path: '/users',
    handler: (languidReq) => {},
  }

  t.deepEqual(defineHandler(route), route.handler, 'wrong return')
})

test('defineHandler', t => {
  t.deepEqual(defineHandler(), defaultHandler, 'wrong return')
})
