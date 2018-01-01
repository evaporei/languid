const test = require('ava')
const { METHODS } = require('http')
const { createApplication } = require('../../../lib/application')

test('createApplication', t => {
  const createServerMock = routes =>
    ({
      listen: PORT => console.log('server listening on PORT:', PORT)
    })

  t.is(
    typeof createApplication(createServerMock),
    'function',
    'wrong type'
  )
})

test('createApplication', t => {
  const createServerMock = routes =>
    ({
      listen: PORT => console.log('server listening on PORT:', PORT)
    })

  const app = createApplication(createServerMock)()

  t.is(typeof app, 'object', 'wrong type of app')

  for (let method of METHODS) {
    method = method.toLowerCase()
    t.is(typeof app[method], 'function', 'wrong type of method in app')
    t.is(app[method].length, 2, 'wrong arity of method in app')
  }
})
