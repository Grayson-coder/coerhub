const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

// 展示动态的具体的标签的接口
module.exports = async (req, res, next) => {
    // 1. 获取当前的动态id
    const { moment_id } = req.query

    // 2. 根据该动态id查询标签列表
    let findSQL = `
            select 
                label.id, label.name
        from  label
        left join moment_label on moment_label.label_id = label.id
        where moment_label.moment_id = ?
    `
    try {
        let findResult = await sqlQuery(findSQL, [moment_id])
        findResult = findResult.map(val => val.name)
        res.send(resultData(200, '查询成功', findResult))

    } catch (error) {
        console.log(error);
        return next({ statusCode: 400, message: '查询标签失败' })
    }
}