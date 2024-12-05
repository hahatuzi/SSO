const express = require('express')
const bodyParser = require('body-parser')
const { ALLOW_ORIGINS } = require('../config')
const cors = require('../middleware/cors')
const router = require('./middleware/router')

const app = express()

app.use(bodyParser.json())
app.use(cors(ALLOW_ORIGINS))
app.use(router(app))

app.listen(5050, () => {
  console.log('auth server is running on port 5050!!!');
  
})