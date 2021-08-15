const express = require('express')
const user = express.Router()

// const {
//     verifyUser,
//     handlePassword
// } = require('./user-middleware/user-middleware')

const register = require('./register/register')
const login = require('./login/login')

const { verify_auth, verify_labelExists } = require('./moment-middleware/moment-middleware')
const add_moment_labels = require('./moment/add_moment_labels')


// 用户注册接口
user.post('/register', register)

// 用户登录接口
user.post('/login', login)


// ----------------------------------- 用户动态接口 -----------------------------------
// 用户动态接口 ---- 添加动态
user.post('/moment', require('./moment/add_moment'))

// 用户动态接口 ---- 删除动态
user.delete('/moment/:momentID', require('./moment/delete_moment'))

// 用户动态接口 ---- 修改动态
user.put('/moment/:momentID', require('./moment/modify_moment'))

// 用户动态接口 ---- 查询所有用户动态 （全部）
user.get('/moment', require('./moment/find_moment'))

// 用户动态接口 ---- 给动态添加标签
user.post('/moment/:momentID/labels', verify_auth, verify_labelExists, add_moment_labels)


// ----------------------------------- 用户评论接口 -----------------------------------
// 发表评论
user.post('/comment', require('./comment/add_comment'))

// 发布回复别人评论的评论
user.post('/comment/reply', require('./comment/add_comment_reply'))

// 修改评论
user.put('/comment/:commentID', require('./comment/modify_comment'))

// 删除评论
user.delete('/comment/:commentID', require('./comment/delete.comment'))

// 评论列表查询
user.get('/comment', require('./comment/find_comment'))



module.exports = user