const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

// 用户评论列表查询接口
module.exports = async (req, res, next) => {
    // 1. 获取用户动态id
    const { momentID } = req.query

    // 2. 从数据库查询该动态下的评论数据（多表查询用户信息）
    let findSQL = `
        select 
            comment.id, comment.content, comment.createTime, comment.updateTime,
            json_object('id', users.id, 'name', users.name) as user_info
        from comment 
        left join users on comment.user_id = users.id
        where comment.moment_id = ?`

    try {
        let data = await sqlQuery(findSQL, [momentID])
        data = data.map(row => (row.user_info = JSON.parse(row.user_info), row))
        res.send(resultData(200, '查询成功', data))

    } catch (error) {
        console.log(error)
        return next({ statusCode: 400, message: '查询评论列表失败' })
    }


}