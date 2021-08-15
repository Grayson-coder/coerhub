const express = require('express')

const file = express.Router()

const { upload_avatar } = require('./avatar/upload_avatar')
const { save_avatarInfo } = require('./avatar/save_avatarInfo')

const { upload_picture } = require('./picture/upload_picture')
const { save_pictureInfo } = require('./picture/save_pictureInfo')
const { resize_picture } = require('./picture/resize_picture')


// 头像上传接口
file.post('/avatar', upload_avatar, save_avatarInfo)


// 动态的图片上传接口
file.post('/picture', upload_picture, resize_picture, save_pictureInfo)



module.exports = file