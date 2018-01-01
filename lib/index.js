const { createApplication } = require('./application')
const {
  createServer,
  httpHandler,
  onHttpRequestDataEnd,
} = require('./server')

module.exports = createApplication(
  createServer(onHttpRequestDataEnd)(httpHandler)
)
