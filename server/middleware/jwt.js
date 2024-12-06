const jwt = require('jsonwebtoken')

module.exports = function verifyToken (secretKey, type = 'token') {
  return function (req, res, next) {
    
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (type == 'refreshToken') {
          return res.json({
            code: 3,
            msg:'Invalid RefreshToken'
          })
        } else {
          return res.json({
            code: 2,
            msg:'Invalid Token'
          })
        }
      }
      // 传递给下一个中间件
      req.tokenInfo = decoded
      next()
    })
  }
}