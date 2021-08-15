const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

// 用户评论发布接口
module.exports = async (req, res, next) => {
    // 1. 获取要评论的动态id、用户id、评论内容
    const { moment_id, user_id, content } = req.body

    // 2. 将评论数据插入到comment表中
    let addSQL = `insert into comment(content, user_id, moment_id) values(?, ?, ?)`

    try {
        let data = await sqlQuery(addSQL, [content, user_id, moment_id])
        res.send(resultData(200, '添加评论成功', data))

    } catch (error) {
        console.log(error)
        // 返回错误处理中间件
        next({ statusCode: 401, message: '动态评论失败' })
    }

}