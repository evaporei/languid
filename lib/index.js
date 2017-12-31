const http = require('http')
const { parse: parseUrl } = require('url')
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

  const buildMethodRoute = app => method =>
    (path, handler) => {
      app.routes.push({
        path, handler, method
      })
    }

  const addMethodRouteToApp = app => methodName =>
    app[methodName] = buildMethodRoute(app)(methodName)

  pipe(
    map(toLower),
    forEach(addMethodRouteToApp(application))
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
      httpReq.body = body

      const bufferArrayToObject = pipe(
        Buffer.concat,
        toString,
        when(
          isEmpty,
          always('{}')
        ),
        JSON.parse
      )

      const createLanguidReq = httpReq => pipe(
        assoc('body', bufferArrayToObject(httpReq.body)),
        assoc('query', parseUrl(httpReq.url, true).query),
        merge(
          pickAll(['headers', 'url', 'method'], httpReq)
        )
      )({})

      const languidReq = createLanguidReq(httpReq)

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

      const responseSender = httpRes => ({
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
          propEq('path', parseUrl(languidReq.url, true).pathname, route) &&
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
        .then(responseSender(httpRes))
        .catch(console.log)
    })
  }

  return http.createServer(httpHandler)
}
