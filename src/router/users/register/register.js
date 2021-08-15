const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')
const bcryptPassword = require('../../../tool/password-handle')

// 用户注册中间件的回调函数
module.exports = async (req, res, next) => {
    // 1. 获取post请求参数
    const { name, password } = req.body

    // 2. 判断用户名或密码不能为空
    if (!name || !password) {
        // 调用错误处理中间件，并传入错误信息
        return next({ statusCode: 400, message: '用户名或密码不能为空' })
    }

    // 3. 判断用户名在数据库中是否已存在
    let findSQL = `select * from users where name = ?`
    let findResult = await sqlQuery(findSQL, [name])
    if (findResult.length > 0) {
        return next({ statusCode: 409, message: '用户名重复，请选择其他用户名' })
    }

    // 4. 对密码进行加密
    let newPassword = await bcryptPassword(password)

    // 5. 将用户信息存储到数据库中
    let insertSQL = `insert into users (name, password) values (?, ?)`
    let insertResult = await sqlQuery(insertSQL, [name, newPassword])
 
    // 响应数据
    res.send(resultData(200, '用户注册成功'))
}


