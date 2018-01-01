const test = require('ava')
const { bufferArrayToObject } = require('../../../lib/utils')

test('bufferArrayToObject', t => {
  const dataObject = {
    a: {
      b: 'str',
    },
    c: [
      {
        d: true,
        e: 5,
      },
      {
        d: false,
        e: 6,
      },
    ],
  }

  const dataString = JSON.stringify(dataObject)

  const bufferArray = [Buffer(dataString)]

  t.is(typeof bufferArrayToObject(bufferArray), 'object', 'wrong type')
  t.deepEqual(
    bufferArrayToObject(bufferArray),
    dataObject,
    'wrong content'
  )
})
