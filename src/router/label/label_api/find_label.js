const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

// 展示标签的接口
module.exports = async (req, res, next) => {
    // 1. 获取查询数量和第几条记录开始查询
    const { count, offset } = req.query

    // 2. 分页查询标签列表
    let findSQL = `select * from label limit ?, ?`
    try {
        let findResult = await sqlQuery(findSQL, [Number(offset), Number(count)])
        res.send(resultData(200, '查询成功', findResult))

    } catch (error) {
        console.log(error);
        return next({ statusCode: 400, message: '查询标签失败' })
    }
}