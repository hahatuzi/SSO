const { REFRESH_TOKEN_KEY } = require('../../config')
const verifyToken = require('../../middleware/jwt')
const { refreshToken, loginAction, test } = require('../handler')

module.exports = function router(app){
    return function (req, res,next) {
    app.get('/auth/test', test)
    app.post('/auth/login', loginAction)
    app.post('/auth/refresh', verifyToken(REFRESH_TOKEN_KEY, 'refreshToken'), refreshToken)

    next()
  }
}