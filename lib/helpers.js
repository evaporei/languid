const {
  always,
  isEmpty,
  pipe,
  toString,
  when,
} = require('ramda')

const bufferArrayToObject = pipe(
  Buffer.concat,
  toString,
  when(
    isEmpty,
    always('{}')
  ),
  JSON.parse
)

module.exports = {
  bufferArrayToObject,
}
