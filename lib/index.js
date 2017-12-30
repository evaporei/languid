const http = require('http')
const Promise = require('bluebird')
const {
  assoc,
  merge,
  pickAll,
  pipe,
  toString,
} = require('ramda')

module.exports = function createServer (languidHandler) {
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
        JSON.parse
      )

      const languidReq = merge(
        pickAll(['headers', 'url', 'method'], httpReq),
        assoc('body', bufferArrayToObject(body), {})
      )

      const responseBuilder = languidRes => {
        const defaultHeaders = {
          'Content-Type': 'application/json',
          'X-Powered-By': 'languid',
        }

        return {
          statusCode: languidRes.statusCode,
          headers: merge(
            defaultHeaders,
            languidRes.headers
          ),
          body: JSON.stringify(languidRes.body),
        }
      }

      const responseSender = ({
        statusCode,
        headers,
        body,
      }) => {
        httpRes.writeHead(
          statusCode,
          headers
        )
        httpRes.write(body)
        httpRes.end()
      }

      return languidHandler(languidReq)
        .then(responseBuilder)
        .then(responseSender)
        .catch(console.log)
    })
  }

  return http.createServer(httpHandler)
}
