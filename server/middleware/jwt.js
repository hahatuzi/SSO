const jwt = require('jsonwebtoken')

module.exports = function verifyToken (secretKey) {
  return function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, secretKey, (err, decoded) => {
      console.log(err,decoded)
      console.log('err,decoded)')
      if (err) {
        return res.json({
          code:2,
          mes:'Invalid Token'
        })
      }
      // 传递给下一个中间件
      req.tokenInfo = decoded
      next()
    })
  }
}