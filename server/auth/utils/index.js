const jwt = require('jsonwebtoken')

function createToken (secretKey, payload, options) {
  return jwt.sign(payload, secretKey, options)
}

module.exports = {
  createToken
}