const jwt = require('jsonwebtoken')
const config = require('../config')

// 生成token并添加到响应头中
exports.genToken = (payload, res) => {
  const token = jwt.sign(payload, config.secret, { expiresIn: config.expires, audience: config.audience, issuer: config.issuer })
  res.setHeader('authorization', 'Bearer ' + token)
}
// 读取token
// req.token
// req.payload
exports.verfyToken = (req, res, next) => {
  if (!req.headers.authorization) return next()
  const temp = req.headers.authorization.split(' ')
  if (temp.length === 2 && temp[0] === 'Bearer') {
    req.token = temp[1]
    jwt.verify(req.token, config.secret, (err, data) => {
      if (err) return next(err)
      req.payload = data
      next()
    })
  }
}
