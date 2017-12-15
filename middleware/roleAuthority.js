const url = require('url')

// 权限访问限制
module.exports = (req, res, next) => {
  const arr = ['/user/signin', '/user/signup']
  const pathname = url.parse(req.url).pathname
  if (!res.payload && arr.indexOf(pathname) === -1) {
    res.send({
      errcode: 10403,
      errmsg: 'you need sigin'
    })
  }
  next()
}
