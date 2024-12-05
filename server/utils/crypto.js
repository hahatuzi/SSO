const crypto = require('crypto')

function createCryptoHash (str) {
  const hash = crypto.createHash('sha256')
  hash.update(str)
  return hash.digest('hex')
}

function checkCryptoHash (str, cryptoHash) {
  return createCryptoHash(str) === cryptoHash
}

module.exports = {
  createCryptoHash,
  checkCryptoHash
}