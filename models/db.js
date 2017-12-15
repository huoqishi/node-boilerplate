const Sequelize = require('sequelize')
/**
 * params qs 数据库名
 * params root 数据库用户名
 * params      数据库密码
 */
const sequelize = new Sequelize('qs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // | 'sqlite' | 'postgres' | 'mssql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  // 仅限 SQLite
  // storage: 'path/to/database.sqlite'
})

module.exports = sequelize
