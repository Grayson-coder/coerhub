const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')


// 评论修改接口
module.exports = async (req, res, next) => {
    // 1. 获取要修改的评论id、评论内容、登录的用户id
    const { commentID } = req.params
    const { content, user_id } = req.body

    // 2. 判断当前登录的用户是否有修改这条评论的权限
    // 2.1 根据id查询评论数据
    let findSQL = `select * from comment where id = ?`
    let data = await sqlQuery(findSQL, [commentID])
    // 2.2 判断查询到的评论数据中的用户id是否与登录的用户id一致
    if (data[0].user_id != user_id) {
        return next({ statusCode: 401, message: '当前用户无操作权限' })
    }

    // 3. 从数据库中修改评论
    try {
        let editSQL = `update comment set content = ? where id = ?`
        let data = await sqlQuery(editSQL, [content, commentID])
        res.send(resultData(200, '修改评论成功', data))

    } catch (error) {
        console.log(error);
        return next({ statusCode: 400, message: '修改评论失败' })
    }

    
}