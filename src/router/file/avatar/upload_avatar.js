const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../../', 'uploads/avatar'))
    }, 

    // 设置文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const avatarUpload = multer({
    storage
})

// 头像上传处理
const upload_avatar = avatarUpload.single('avatar')

module.exports = {
    upload_avatar
}