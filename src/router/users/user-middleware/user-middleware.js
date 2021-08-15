const sqlQuery = require('../../../dataBase/mysql')
const bcryptPassword = require('../../../tool/password-handle')

// 用户校验中间件
const verifyUser = async (req, res, next) => {
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

    // 执行下一个回调函数
    return next()
}

// 密码加密中间件
const handlePassword = async (req, res, next) => {
    const { password } = req.body
    // 4. 对密码进行加密
    let newPassword = await bcryptPassword(password)
    req.body.password = newPassword

    // 执行下一个回调函数
    return next()
}

module.exports = {
    verifyUser,
    handlePassword
}