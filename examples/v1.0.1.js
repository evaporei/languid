const languid = require('../languid/lib')
const Promise = require('bluebird')

languid(req => {
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
    .then(s => {
      throw new Error('stuff')
    })
    .catch(err => {
      return {
        statusCode: 401,
        headers: {
          stuff:'bad content',
        },
        body: {
          bad: 'bad',
        },

      }
    })
})
  .listen(8000)
