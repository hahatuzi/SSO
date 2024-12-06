const { ACCESS_TOKEN_KEY } = require('../../config')
const verifyToken = require('../../middleware/jwt')
const {getCustomer, test} = require('../handler')
const customer = require('../database/customer')

module.exports = function router (app) {
  return function (req, res, next) {
    app.get('/api/test', test)
    app.post('/api/customer', verifyToken(ACCESS_TOKEN_KEY), getCustomer)
    next()
  }
}