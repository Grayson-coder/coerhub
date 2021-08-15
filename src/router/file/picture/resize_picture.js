const jimp = require('jimp')
const path = require('path')

// 对图像大小进行处理
const resize_picture = async (req, res, next) => {
    // 1. 获取所有的图像信息
    const files = req.files

    // 2. 遍历图片数组对图片进行处理
    for (let file of files) {
        let destPath = path.join(file.destination, file.filename)
        const image = await jimp.read(file.path)
        // 将图片分成三种尺寸并且进行文件写入
        image.resize(1280, jimp.AUTO).write(`${destPath}-large`)
        image.resize(640, jimp.AUTO).write(`${destPath}-middle`)
        image.resize(320, jimp.AUTO).write(`${destPath}-small`)
    }

    return next()
}


module.exports = {
    resize_picture
}