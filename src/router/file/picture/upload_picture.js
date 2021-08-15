const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../../', 'uploads/picture'))
    }, 

    // 设置文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const pictureUpload = multer({
    storage
})

// 动态图片上传处理
const upload_picture = pictureUpload.array('picture')

module.exports = {
    upload_picture
}