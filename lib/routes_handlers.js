const { parse: parseUrl } = require('url')
const {
  propEq,
  toLower,
} = require('ramda')

const isRightRoute = languidReq => route =>
  propEq('path', parseUrl(languidReq.url, true).pathname, route) &&
    route.method === toLower(languidReq.method)

const defaultHandler = () => ({
  statusCode: 501,
})

const defineHandler = route =>
  route ?
    route.handler :
    defaultHandler

const executeHandler = languidReq => handler =>
  handler(languidReq)

module.exports = {
  defaultHandler,
  defineHandler,
  executeHandler,
  isRightRoute,
}
