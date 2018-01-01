const http = require('http')
const Promise = require('bluebird')
const {
  find,
} = require('ramda')
const { createLanguidReq } = require('./request')
const {
  responseBuilder,
  responseSender,
} = require('./response')
const {
  defineHandler,
  executeHandler,
  isRightRoute,
} = require('./routes_handlers')

const onHttpRequestDataEnd = (httpReq, httpRes, routes) => {
  const languidReq = createLanguidReq(httpReq)

  return Promise.resolve(routes)
    .then(find(isRightRoute(languidReq)))
    .then(defineHandler)
    .then(executeHandler(languidReq))
    .then(responseBuilder)
    .then(responseSender(httpRes))
    .catch(console.log)
}

const httpHandler = onDataEnd => routes => (httpReq, httpRes) => {
  const body = []

  httpReq.on('error', console.log)

  httpReq.on('data', bufferData => {
    body.push(bufferData)
  })

  httpReq.on('end', () => {
    httpReq.body = body

    return onDataEnd(httpReq, httpRes, routes)
  })
}

const createServer = onDataEnd => httpHandler => routes =>
  http.createServer(httpHandler(onDataEnd)(routes))

module.exports = {
  createServer,
  httpHandler,
  onHttpRequestDataEnd,
}
