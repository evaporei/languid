const { parse: parseUrl } = require('url')
const {
  assoc,
  merge,
  pickAll,
  pipe,
} = require('ramda')
const { bufferArrayToObject } = require('./utils')

const createLanguidReq = httpReq => pipe(
  assoc('body', bufferArrayToObject(httpReq.body)),
  assoc('query', parseUrl(httpReq.url, true).query),
  merge(
    pickAll(['headers', 'url', 'method'], httpReq)
  )
)({})

module.exports = {
  createLanguidReq,
}
