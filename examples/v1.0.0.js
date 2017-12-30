// v1.0.0
const languid = require('../lib')

languid(req => {
  console.log(req.headers)
  console.log(req.body)
  return {
    statusCode: 404,
    headers: {
      stuff:'content',
    },
    body: {
      ok: 'ok',
    },
  }
})
  .listen(8000)
