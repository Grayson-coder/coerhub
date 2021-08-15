const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')


// 用户动态修改接口
module.exports = async (req, res, next) => {
    // 1. 获取当前登录的用户id、修改内容、动态id
    const { user_id, content } = req.body
    const { momentID } = req.params

    // 2. 判断要修改的动态id是否为当前登录的用户的动态
    let findSQL = `select * from moment where id = ? and user_id = ?`
    let findData = await sqlQuery(findSQL, [momentID, user_id])
    if (findData.length === 0) {
        return next({ statusCode: 401, message: '当前用户无操作权限' })
    }

    // 3. 从数据库中修改动态
    try {
        let editSQL = `update moment set content = ? where id = ?`
        await sqlQuery(editSQL, [content, momentID])
        res.send(resultData(200, '修改动态成功'))

    } catch (error) {
        console.log(error);
        next({ statusCode: 401, message: '修改动态失败' })
    }
}