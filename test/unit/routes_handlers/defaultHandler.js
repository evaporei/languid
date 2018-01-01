const test = require('ava')
const { defaultHandler } = require('../../../lib/routes_handlers')

test('defaultHandler', t => {
  t.deepEqual(defaultHandler(), { statusCode: 501 }, 'wrong return')
})
