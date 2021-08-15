const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

// 添加标签的接口
module.exports = async (req, res, next) => {
    // 1. 获取标签名
    const { name } = req.body

    // 2. 将标签名添加到数据表中
    let addSQL = `insert into label(name) values (?)`

    try {
        let data = await sqlQuery(addSQL, [name])
        res.send(resultData(200, '添加标签成功', data))

    } catch (error) {
        console.log(error);
        return next({ statusCode: 400, message: '添加标签失败' })
    }

}