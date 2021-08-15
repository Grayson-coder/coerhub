const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')


// 用户动态查询接口（分页查询）
module.exports = async (req, res, next) => {
    // 1. 获取查询的数量和查询的位置
    const { size, offset } = req.query

    // 2. 根据参数进行分页查询(分页参数必须是数字类型)
    // 分页查询 + 多表查询结果转换的SQL语句
    const findSQL = `
        select 
            moment.id, moment.content, moment.createTime,moment.updateTime,
            json_object("id", users.id, "name", users.name) as user_info,
            (select count(*) from comment where comment.moment_id = moment.id) as commentCount
        from moment 
        left join users on moment.user_id = users.id
        limit ?, ?;`
    
    try {
        let data = await sqlQuery(findSQL, [Number(offset), Number(size)])
        // 需要手动的对数组中的json对象进行迭代转换成对象形式在返回给浏览器
        data = data.map(row => (row.user_info = JSON.parse(row.user_info), row));
        return res.send(resultData(200, '动态查询成功', data))
    } catch (error) {
        console.log(error);
        // 返回错误处理中间件
        next({ statusCode: 401, message: '动态查询失败' })
    }

}