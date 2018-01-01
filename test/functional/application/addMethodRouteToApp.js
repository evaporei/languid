const test = require('ava')
const Promise = require('bluebird')
const { addMethodRouteToApp } = require('../../../lib/application')

test('addMethodRouteToApp', t => {
  const app = {
    routes: [],
  }

  t.is(typeof addMethodRouteToApp(app), 'function', 'wrong type')
  t.is(addMethodRouteToApp(app).length, 1, 'wrong arity')
})

test('addMethodRouteToApp', t => {
  const app = {
    routes: [],
  }

  const methodName = 'put'

  addMethodRouteToApp(app)(methodName)

  t.is(typeof app[methodName], 'function', 'wrong type')
})

test('addMethodRouteToApp', t => {
  const app = {
    routes: [],
  }

  const methodName = 'put'

  addMethodRouteToApp(app)(methodName)

  app[methodName]('/users', req => {
    return Promise.resolve({
      statusCode: 200,
    })
  })

  t.is(app.routes.length, 1, 'wrong length of routes in app')
})
