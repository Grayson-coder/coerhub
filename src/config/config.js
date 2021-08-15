const dotenv = require('dotenv')

// 将根目录的.env文件中的变量写入到process全局变量中
dotenv.config()

// 相关配置信息
let {
    APP_PORT,
    APP_Host,
    MySQL_HOST,
    MySQL_PORT,
    MySQL_DATABASE,
    MySQL_USER,
    MySQL_PASSWORD,
} = process.env

// 统一进行导出
module.exports = {
    APP_PORT,
    APP_Host,
    MySQL_HOST,
    MySQL_PORT,
    MySQL_DATABASE,
    MySQL_USER,
    MySQL_PASSWORD,
}