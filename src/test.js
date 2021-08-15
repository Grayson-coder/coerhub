const express = require('express')

const multer = require('multer')

const storage = multer.diskStorage({
    // 存储路径
    destination: function (req, file, cb) {
        cb(null, 'uploads2/')
    },
    // 设置文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})


const app = express()

// 上传单个文件
app.post('/', upload.single('avatar'), (req, res, next) => {
    res.send(req.file)
})




app.listen(9999, err => {
    if (err) return console.log('服务器启动失败')
    console.log(`服务器启动成功，端口号9999`)
})

