const mysql = require('mysql')
const config = require('../config/config')
 
// 创建连接池
const pool = mysql.createPool({
    host: config.MySQL_HOST,
    port: config.MySQL_PORT,
    user: config.MySQL_USER,
    password: config.MySQL_PASSWORD,
    database: config.MySQL_DATABASE,
})

// 连接MySQL
pool.getConnection(err => {
    if (err) return console.log('连接MySQL数据库失败', err)
    console.log(`连接MySQL数据库成功，操作的数据库名称：${config.MySQL_DATABASE}`);
})

/**
 * 预处理语句的封装
 * 返回Promise
 */
function sqlQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}


module.exports = sqlQuery

