/** 
 * 生成两个token
 * access_token
 * refresh_token
*/

const ACCESS_TOKEN_KEY = 'gertqvtqebt'
const REFRESH_TOKEN_KEY = 'q2rewt'

const ALLOW_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
]

const ACCESS_TOKEN_OPTIONS = {
  expiresIn: 60
}
const REFRESH_TOKEN_OPTIONS = {
  expiresIn: 60 * 3
}

module.exports = {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ALLOW_ORIGINS,
  ACCESS_TOKEN_OPTIONS,
  REFRESH_TOKEN_OPTIONS
}