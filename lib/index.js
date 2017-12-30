const http = require('http')
const {
  assoc,
  merge,
  pickAll,
  pipe,
  toString,
} = require('ramda')

module.exports = function createServer (languidHandler) {
  const httpHandler = (httpReq, httpRes) => {
    let body = []

    httpReq.on('error', error => {
      console.log(error)
    })

    httpReq.on('data', bufferData => {
      body.push(bufferData)
    })

    httpReq.on('end', () => {
      const bufferArrayToObject = pipe(
        Buffer.concat,
        toString,
        JSON.parse
      )

      const languidReq = merge(
        pickAll(['headers', 'url', 'method'], httpReq),
        assoc('body', bufferArrayToObject(body), {})
      )

      const languidRes = languidHandler(languidReq)

      const defaultHeaders = {
        'Content-Type': 'application/json',
        'X-Powered-By': 'languid',
      }

      const headers = merge(
        defaultHeaders,
        languidRes.headers
      )

      httpRes.writeHead(
        languidRes.statusCode,
        headers
      )

      httpRes.write(JSON.stringify(languidRes.body))

      httpRes.end()
    })
  }

  return http.createServer(httpHandler)
}
