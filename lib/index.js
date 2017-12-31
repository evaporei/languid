const { createApplication } = require('./application')
const { createServer } = require('./server')

module.exports = createApplication(createServer)
