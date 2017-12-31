const http = require('http')
const url = require('url')
const Promise = require('bluebird')
const {
  always,
  assoc,
  find,
  forEach,
  isEmpty,
  map,
  merge,
  pickAll,
  pipe,
  propEq,
  toLower,
  toString,
  when,
} = require('ramda')

module.exports = function createApplication () {
  const application = {
    routes: [],
  }

  const buildMethodRoute = method =>
    (path, handler) => {
      application.routes.push({
        path, handler, method
      })
    }

  const addMethodRouteToApp = methodName =>
    application[methodName] = buildMethodRoute(methodName)

  pipe(
    map(toLower),
    forEach(addMethodRouteToApp)
  )(http.METHODS)

  application.listen = PORT =>
    createServer(application.routes).listen(PORT)

  return application
}

function createServer (routes) {
  const httpHandler = (httpReq, httpRes) => {
    const body = []

    httpReq.on('error', console.log)

    httpReq.on('data', bufferData => {
      body.push(bufferData)
    })

    httpReq.on('end', () => {
      const bufferArrayToObject = pipe(
        Buffer.concat,
        toString,
        when(
          isEmpty,
          always('{}')
        ),
        JSON.parse
      )

      const languidReq = pipe(
        assoc('body', bufferArrayToObject(body)),
        assoc('query', url.parse(httpReq.url, true).query),
        merge(
          pickAll(['headers', 'url', 'method'], httpReq)
        )
      )({})

      const responseBuilder = languidRes => {
        const defaultHeaders = {
          'Content-Type': 'application/json',
          'X-Powered-By': 'languid',
        }

        return {
          statusCode: languidRes.statusCode,
          headers: merge(
            defaultHeaders,
            languidRes.headers || {}
          ),
          body: JSON.stringify(languidRes.body || {}),
        }
      }

      const responseSender = ({
        statusCode,
        headers,
        body,
      }) => {
        if (!statusCode) {
          throw new Error(
            'statusCode has not been set, connection hangup'
          )
        }
        httpRes.writeHead(
          statusCode,
          headers
        )
        httpRes.write(body)
        httpRes.end()
      }

      const isRightRoute = route =>
          propEq('path', url.parse(languidReq.url, true).pathname, route) &&
          route.method === toLower(languidReq.method)

      const defaultHandler = () => ({
        statusCode: 501,
      })

      const defineHandler = route =>
        route ?
          route.handler(languidReq) :
          defaultHandler()

      return Promise.resolve(routes)
        .then(find(isRightRoute))
        .then(defineHandler)
        .then(responseBuilder)
        .then(responseSender)
        .catch(console.log)
    })
  }

  return http.createServer(httpHandler)
}
