const test = require('ava')
const { isRightRoute } = require('../../../lib/routes_handlers')

test('isRightRoute', t => {
  const languidReqMock = {
    method: 'GET',
    url: '/bla?name=john',
  }

  t.is(typeof isRightRoute(languidReqMock), 'function', 'wrong type')
})

test('isRightRoute', t => {
  const languidReqMock = {
    method: 'GET',
    url: '/users?name=john',
  }

  const route = {
    method: 'get',
    path: '/users',
  }

  t.is(
    typeof isRightRoute(languidReqMock)(route),
    'boolean',
    'wrong type'
  )

  t.is(
    isRightRoute(languidReqMock)(route),
    true,
    'wrong value'
  )
})

test('isRightRoute', t => {
  const languidReqMock = {
    method: 'GET',
    url: '/bla?name=john',
  }

  const route = {
    method: 'get',
    path: '/users',
  }

  t.is(
    typeof isRightRoute(languidReqMock)(route),
    'boolean',
    'wrong type'
  )

  t.is(
    isRightRoute(languidReqMock)(route),
    false,
    'wrong value'
  )
})

test('isRightRoute', t => {
  const languidReqMock = {
    method: 'GET',
    url: '/users?name=john',
  }

  const route = {
    method: 'get',
    path: '/bla'
  }

  t.is(
    typeof isRightRoute(languidReqMock)(route),
    'boolean',
    'wrong type'
  )

  t.is(
    isRightRoute(languidReqMock)(route),
    false,
    'wrong value'
  )
})

test('isRightRoute', t => {
  const languidReqMock = {
    method: 'GET',
    url: '/users?name=john',
  }

  const route = {
    method: 'post',
    path: '/users',
  }

  t.is(
    typeof isRightRoute(languidReqMock)(route),
    'boolean',
    'wrong type'
  )

  t.is(
    isRightRoute(languidReqMock)(route),
    false,
    'wrong value'
  )
})

test('isRightRoute', t => {
  const languidReqMock = {
    method: 'POST',
    url: '/users?name=john',
  }

  const route = {
    method: 'get',
    path: '/users',
  }

  t.is(
    typeof isRightRoute(languidReqMock)(route),
    'boolean',
    'wrong type'
  )

  t.is(
    isRightRoute(languidReqMock)(route),
    false,
    'wrong value'
  )
})

test('isRightRoute', t => {
  const languidReqMock = {
    method: 'POST',
    url: '/users?name=john',
  }

  const route = {
    method: 'get',
    path: '/bla'
  }

  t.is(
    typeof isRightRoute(languidReqMock)(route),
    'boolean',
    'wrong type'
  )

  t.is(
    isRightRoute(languidReqMock)(route),
    false,
    'wrong value'
  )
})
