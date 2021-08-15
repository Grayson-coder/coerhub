const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

const { APP_PORT, APP_Host, } = require('../../../config/config')

// 保存头像信息到数据库中
const save_avatarInfo = async (req, res, next) => {
    // 1. 获取当前登录的用户id
    const { user_id } = req.body
    // 2. 获取保存后的图片名字
    const { filename } = req.file
    // 3. 将图片名字与服务器主机进行拼接，生成一个URL地址(静态资源访问地址)
    let avatar_URL = `${APP_Host}:${APP_PORT}/avatar/${filename}`

    // 4. 将图片URL地址保存到users表中
    let updateSQL = `update users set avatar_url = ? where id = ?`
    
    try {
        let updateResult = await sqlQuery(updateSQL, [avatar_URL, user_id])
        // 5. 将生成好的头像URL地址返回给浏览器
        res.send(resultData(200, '保存头像成功', avatar_URL))

    } catch (error) {
        console.log(error)
        return next({ statusCode: 400, message: '头像保存服务器失败' })
    }
}

module.exports = {
    save_avatarInfo
}