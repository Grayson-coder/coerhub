const sqlQuery = require('../../../dataBase/mysql')

// 一、校验用户权限操作
const verify_auth = async (req, res, next) => {
    // 1. 获取标签数组、动态id、当前登录的用户id
    const { labels, user_id } = req.body
    const { momentID } = req.params

    // 2. 判断当前的用户是否有给这条动态添加标签的权限
    let findSQL = `select * from moment where user_id = ? and id  = ?`
    let findData = await sqlQuery(findSQL, [user_id, momentID])
    if (findData.length === 0) {
        return next({ statusCode: 400, message: '当前用户无操作权限' })
    }

    // 交给下一个中间件处理函数
    return next()
}


// 二、校验标签是否已存在label数据表中
const verify_labelExists = async (req, res, next) => {
    // 1. 获取标签数组
    const { labels } = req.body

    // 2. 判断要添加的标签是否已经存在label表中，如果不存在则插入进去
    let labelArr = [] // 保存用户传入过来的标签信息
    for (let name of labels) {
        let findSQL = `select * from label where name = ?`
        let findResult = await sqlQuery(findSQL, [name])
        // console.log(findResult);
        let label_id = ''

        // 如果标签不存在label表中，则添加到数据表中,并且保存插入后的id到数组中
        if (findResult.length === 0) {
            let addSQL = `insert into label (name) values (?)`
            let addResult = await sqlQuery(addSQL, [name])
            // console.log(addResult);
            label_id = addResult.insertId

        } else {
            // 如果存在，也需要将查询到的id保存起来
            label_id = findResult[0].id
        }

        // 每个用户添加的标签都需要保存到数组中
        labelArr.push({ name, label_id })
    }

    console.log(labelArr);

    // 将标签数据保存到请求头中给下一个中间件使用
    req.labelArr = labelArr

    // 交给下一个中间件处理函数
    return next()
}



module.exports = {
    verify_auth,
    verify_labelExists
}