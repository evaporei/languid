const {
  merge,
} = require('ramda')

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

module.exports = {
  responseBuilder,
  responseSender,
}
