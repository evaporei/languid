const test = require('ava')
const Promise = require('bluebird')
const { buildMethodRoute } = require('../../../lib/application')

test('buildMethodRoute', t => {
  const app = {
    routes: [],
  }

  t.is(typeof buildMethodRoute(app), 'function', 'wrong type')
  t.is(buildMethodRoute(app).length, 1, 'wrong arity')
})

test('buildMethodRoute', t => {
  const app = {
    routes: [],
  }

  const method = 'get'

  t.is(typeof buildMethodRoute(app)(method), 'function')
  t.is(buildMethodRoute(app)(method).length, 2, 'wrong arity')
})

test('buildMethodRoute', t => {
  const app = {
    routes: [],
  }

  const method = 'get'

  const path = '/users'

  const handler = req =>
    Promise.resolve({
      statusCode: 200,
    })

  t.is(app.routes.length, 0, 'wrong length of routes in app')

  buildMethodRoute(app)(method)(path, handler)

  t.is(app.routes.length, 1, 'wrong length of routes in app')
})

test('buildMethodRoute', t => {
  const app = {
    routes: [],
  }

  const method = 'get'

  const path = '/users'

  const handler = req =>
    Promise.resolve({
      statusCode: 200,
    })

  buildMethodRoute(app)(method)(path, handler)

  const route = app.routes[0]

  t.deepEqual(
    route,
    { path, method, handler },
    'wrong content of route in routes of app'
  )
})

test('buildMethodRoute', t => {
  const app = {
    routes: [],
  }

  const method1 = 'get'

  const path1 = '/users'

  const handler1 = req =>
    Promise.resolve({
      statusCode: 200,
    })

  buildMethodRoute(app)(method1)(path1, handler1)

  const route1 = app.routes[0]

  t.deepEqual(
    route1,
    { path: path1, method: method1, handler: handler1 },
    'wrong content of first route in routes of app'
  )

  const method2 = 'post'

  const path2 = '/users'

  const handler2 = req =>
    Promise.resolve({
      statusCode: 200,
    })

  buildMethodRoute(app)(method2)(path2, handler2)

  const route2 = app.routes[1]

  t.deepEqual(
    route2,
    { path: path2, method: method2, handler: handler2 },
    'wrong content of second route in routes of app'
  )
})
