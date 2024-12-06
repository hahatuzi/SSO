const { ACCESS_TOKEN_KEY, ACCESS_TOKEN_OPTIONS, REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTIONS } = require("../../config")
const {checkCryptoHash} = require('../../utils/crypto')
const users = require('../database/user')
const { createToken } = require("../utils")

exports.test = function (req,res) {
  res.json({
    data:'test'
  })
}
exports.loginAction = function (req,res) {
  const {username, password} = req.body
  const userData = users[username]
  if (!userData) {
    return res.json({
      code:1,
      msg:'Invalid username'
    })
  }

  const isRightPassword = checkCryptoHash(password, userData.password)
  if (!isRightPassword) {
    return res.json({
      code:1,
      msg:'Invalid password'
    })
  }

  const {accessToken, refreshToken} = createDoubleToken(userData)
  res.json({
    code:0,
    msg:'登录成功',
    data: {accessToken, refreshToken}
  })
}


exports.refreshToken = function (req,res) {
  const {tokenInfo} = req
  const {userId, username} = tokenInfo
  const userData = users[username]
  if (userData && userData.id == userId) {
    const {accessToken, refreshToken} = createDoubleToken(userData)
    res.json({
      code:0,
      msg:'刷新成功',
      data: {accessToken, refreshToken}
    })
  }
  res.json({
    code:1, msg:' user doesn\'t exist'
  })
}

function createDoubleToken (userData) {
  const accessToken = createToken(ACCESS_TOKEN_KEY, {userId: userData.id, username: userData.username}, ACCESS_TOKEN_OPTIONS)
  const refreshToken = createToken(REFRESH_TOKEN_KEY, {userId: userData.id, username: userData.username}, REFRESH_TOKEN_OPTIONS )

  return {
    accessToken,
    refreshToken
  }
}

