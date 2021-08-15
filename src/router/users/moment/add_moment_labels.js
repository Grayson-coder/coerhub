const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

// 给动态添加标签的接口
module.exports = async (req, res, next) => {
    try {
        // 1. 获取用户添加的标签数组、动态id
        const { labelArr } = req
        const { momentID } = req.params

        // 2. 判断标签id与动态id是否已经在中间表中存在（标签id和动态id的组合必须是唯一的）
        for (let label of labelArr) {
            let findSQL = `select * from moment_label where moment_id = ? and label_id = ?`
            let findResult = await sqlQuery(findSQL, [momentID, label.label_id])

            // 如果moment_id和label_id关系不重复则插入数据，否则不插入
            if (findResult.length === 0) {
                let addSQL = `insert into moment_label(moment_id, label_id) values (?, ?)`
                let addResult = await sqlQuery(addSQL, [momentID, label.label_id])
            }
        }
        res.send(resultData(200, '添加动态标签成功'))

    } catch (error) {
        console.log(error);
        next({ statusCode: 401, message: '添加动态标签失败' })
    }
}