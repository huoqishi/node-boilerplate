const express = require('express')
const User = require('../models/User')
const router = module.exports = express.Router()

router.prefix = '/user'

/**
 * @api {post} /user/signin 登陆
 * @apiName /user/status
 * @apiGroup User
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} password 用户密码
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示登陆成功
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
router.post('/signin', (req, res, next) => {
  const {username, password} = req.body
  User.findOne({
    where: {username, password}
  }).then(user => {
    if (!user) {
      res.send({errcode: 10403, errmsg: '用户名或密码不正确'})
      return
    }
    // console.log('d')
    // 生成token，并响应
    const userJSON = user.get({plain: true})
    // 客户端刷新token还是服务器端刷新token
    const token = jwt.sign({id: userJSON.id}, config.tokenSecret, {expiresIn: '1h'})
    res.set({
      'access-token': token
    })
    res.send({errcode: 0, errmsg: 'ok', user: userJSON})
  }, next)
})

/**
 * @api {post} /user/signup 注册
 * @apiName /user/signup
 * @apiGroup User
 *
 * @apiParam {string} username 用户名(要求是2-16长度的字符)
 * @apiParam {string} password 用户密码(要求是2-16长度的字符)
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示注册成功
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/signup', (req, res, next) => {
  const {username, password} = req.body
  // 参数验证（Parameter verification）
  const regExp = /(\S){2,16}/
  let errmsg = 'ok'
  const result = (function () {
    if (!regExp.test(username)) {
      errmsg = '用户名必须是 2 - 16长度的字符'
      return false
    }
    if (!regExp.test(password)) {
      errmsg = '密码必须是 2 - 16 长度的字符'
      return false
    }
    return true
  })()
  // 处理参数验证结果
  if (!result) {
    res.send({
      errcode: 1001,
      errmsg
    })
  }
  // 数据库验证
  User.findOne({
    where: {username: username}
  }).then((user) => {
  // User.findAll().then((res) => {
    // console.log(11112)
    // console.log(user)
    if (user) return res.send({errcode: 1403, errmsg: '用户已存在'})
    User.create({
      username, password, nickname: username
    }).then(user => {
      // console.log('创建用户完成')
      res.send({errcode: 0, errmsg, user: user.get({plain: true})})
    }, next)
  }, next)
})

router.get('/test', (req, res, next) => {
  res.send('test is ok')
})
