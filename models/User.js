const Sequelize = require('sequelize')
const sequelize = require('./db')
const User = sequelize.define('users', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  username: {
    type: Sequelize.STRING,
    'unique': true
  },
  nickname: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  // timestamps: false
})
// force: true 如果表已经存在，将会丢弃表
User.sync({force: false}).then((arg, arg2) => {
  // console.log(arg, arg2)
  // 表已创建
  // return User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // })
})
module.exports = User
