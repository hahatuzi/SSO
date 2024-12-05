const customer = require('../database/customer')

exports.test = function (req,res) {
  res.json({
    data:'test'
  })
}

exports.getCustomer = function (req, res) {
  const {userId} = req.body
  const data = customer[userId]
  console.log(req)
  console.log('aegrfe')
  if(!data){
    return res.json({
      code:1,
      msg:'this customer doesn\'t exist'
    })
  } else {
    return  res.json({
      code:0,
      msg:'ok',
      data:data
    })
  }
}