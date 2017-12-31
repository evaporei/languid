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

const defineHandler = languidReq => route =>
  route ?
    route.handler(languidReq) :
    defaultHandler()

module.exports = {
  isRightRoute,
  defaultHandler,
  defineHandler,
}
