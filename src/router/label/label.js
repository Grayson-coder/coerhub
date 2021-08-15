const express = require('express')
const label = express.Router()


// 添加标签接口
label.post('/', require('./label_api/add_label'))

// 展示标签接口
label.get('/list', require('./label_api/find_label'))

// 进入动态详情页时，展示具体的标签接口
label.get('/moment', require('./label_api/find_moment_label'))

module.exports = label