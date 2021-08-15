const bcrypt = require('bcryptjs');

const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')
const { setToken, verify_Token } = require('../../../tool/token')

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
    if (findResult.length == 0) {
        return next({ statusCode: 400, message: '用户名或密码错误请重新输入' })
    }
    // console.log(findResult);

    // 4. 比对密码是否与数据库加密的密码一致
    const isEqual = await bcrypt.compare(password, findResult[0].password)
    if (!isEqual) {
        return next({ statusCode: 400, message: '用户名或密码错误请重新输入' })
    }

    const { id, username, avatar_url } = findResult[0]
    // 5. 生成token并返回给客户端
    const token = setToken({ id, username })

    res.send(resultData(200, '登录成功', { id, name, avatar_url, token }))
}