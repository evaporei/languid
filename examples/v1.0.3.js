const languid = require('../languid/lib')
const Promise = require('bluebird')

const app = languid()

app.get('/', req => {
  console.log(req.headers)
  console.log(req.body)
  return Promise.resolve({
    statusCode: 200,
    headers: {
      stuff:'content',
    },
    body: {
      ok: 'ok',
    },
  })
})

app.post('/dino', req => {
  return Promise.resolve({
    statusCode: 201,
    body: req.body,
  })
    .then(response => {
      throw new Error()
    })
    .catch(error => {
      // this will be the new response
      return {
        statusCode: 500,
        body: {
          message: 'Internal Server Error',
        },
      }
    })
})

app.post('/bla', req => {
  return Promise.resolve({
    statusCode: 404,
    body: {
      got: 'bla',
    },
  })
})

app.listen(8000)
