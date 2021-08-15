const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')


// 用户动态修改接口
module.exports = async (req, res, next) => {
    // 1. 获取当前登录的用户id、要删除的动态id
    const { user_id } = req.body
    const { momentID } = req.params

    // 2. 判断要删除的动态是否为当前登录的用户的动态
    let findSQL = `select * from moment where id = ? and user_id = ?`
    let findData = await sqlQuery(findSQL, [momentID, user_id])
    if (findData.length === 0) {
        return next({ statusCode: 401, message: '当前用户无操作权限' })
    }

    // 3. 从数据库中删除动态
    try {
        let editSQL = `delete from moment where id = ?`
        await sqlQuery(editSQL, [momentID])
        res.send(resultData(200, '删除动态成功'))

    } catch (error) {
        console.log(error);
        next({ statusCode: 401, message: '删除动态失败' })
    }
}