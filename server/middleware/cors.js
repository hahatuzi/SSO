module.exports = function cors (allowOrigins) {
  return function (req, res, next) {
    const { origin } = req.headers
    if(!Array.isArray(allowOrigins) ) {
      return
    }
    if (allowOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET,POST')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization,Accept')
      res.header('Access-Control-Allow-Credentials', 'true')
      next()
    }
  }
}