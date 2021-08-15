const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

const { APP_PORT, APP_Host, } = require('../../../config/config')

// 保存动态的图片到数据库中
const save_pictureInfo = async (req, res, next) => {
    // 1. 获取当前登录的用户id和要上传图片的动态id
    const { user_id, moment_id } = req.body
    // 2. 获取保存后的多张图片信息
    let files = req.files
    // 重构数组结构（数组元素中只有图片名字）
    files = files.map(val => val.filename)

    // 3. 将图片名字与服务器主机进行拼接，生成多个URL地址(静态资源访问地址)
    files = files.map(val => `${APP_Host}:${APP_PORT}/picture/${val}`)

    // 数组转换成字符串
    files = files.toString()

 
    // 4. 将多张图片URL地址保存到 moment 表中
    let updateSQL = `update moment set picture = ? where id = ? and user_id = ?`

    try {
        let updateResult = await sqlQuery(updateSQL, [files, moment_id, user_id])
        // 将字符串转换为数组格式
        files = files.split(',')

        // 5. 将生成好的URL数组返回给浏览器
        res.send(resultData(200, '保存动态图片成功', files))

    } catch (error) {
        console.log(error)
        return next({ statusCode: 400, message: '动态图片保存服务器失败' })
    }
}


module.exports = {
    save_pictureInfo
}