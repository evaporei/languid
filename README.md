# languid

A simple web framework, made for REST/JSON APIs

## Installation

`npm install --save languid`

## Usage

```javascript
const languid = require('../languid/lib')

languid(req => {
  console.log(req.headers)
  console.log(req.body)

  // the return value of this function
  // is the response itself
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

```
