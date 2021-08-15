const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')


// 用户动态添加接口
module.exports = async (req, res, next) => {
    // 1. 获取当前登录的用户id和动态内容
    const { id, content } = req.body

    // 2. 将数据插入到数据库中
    let addSQL = `insert into moment(user_id, content) values(?, ?)`

    try {
        const data = await sqlQuery(addSQL, [id, content])
        return res.send(resultData(200, '动态插入成功', data))

    } catch (error) {
        // 返回错误处理中间件
        next({ statusCode: 401, message: '动态添加失败' })
    }

}