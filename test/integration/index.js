const test = require('ava')
const { METHODS } = require('http')
const Promise = require('bluebird')
const languid = require('../../lib')

test('index', t => {
  t.is(typeof languid, 'function', 'wrong type')
  t.is(languid.length, 0, 'wrong arity')
})

test('index', t => {
  const app = languid()

  t.is(typeof app, 'object', 'wrong type')
})

test('index', t => {
  const app = languid()

  for (let method of METHODS) {
    method = method.toLowerCase()

    t.is(typeof app[method], 'function', 'wrong type')
    t.is(app[method].length, 2, 'wrong arity')
  }
})

test('index', t => {
  const listen = languid().listen

  t.is(typeof listen, 'function', 'wrong type')
  t.is(listen.length, 1, 'wrong arity')
})
