const { METHODS } = require('http')
const {
  forEach,
  map,
  pipe,
  toLower,
} = require('ramda')

const buildMethodRoute = app => method =>
  (path, handler) =>
    app.routes.push({
      path, handler, method
    })

const addMethodRouteToApp = app => methodName =>
  app[methodName] = buildMethodRoute(app)(methodName)

const createApplication = createServer => () => {
  const application = {
    routes: [],
  }

  pipe(
    map(toLower),
    forEach(addMethodRouteToApp(application))
  )(METHODS)

  application.listen = PORT =>
    createServer(application.routes).listen(PORT)

  return application
}

module.exports = {
  addMethodRouteToApp,
  buildMethodRoute,
  createApplication,
}
