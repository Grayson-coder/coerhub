const express = require('express')
const cors = require('cors')
const path = require('path')

const { APP_PORT } = require('./config/config')

const user = require('./router/users/users')
const label = require('./router/label/label')
const file = require('./router/file/file')

const app = express()

// 解析 application/json
app.use(express.json())
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

// 解决跨域问题
app.use(cors())

// 配置静态资源访问
app.use(express.static(path.join(__dirname, '../', '/uploads')))

// 验证token的全局中间件
app.use(require('./middleware/verify_token'))

// 构建二级路由接口
app.use('/user', user)
app.use('/label', label)
app.use('/upload', file)


// 错误处理中间件
app.use(require('./middleware/error'))


app.listen(APP_PORT, err => {
    if (err) return console.log('服务器启动失败')
    console.log(`服务器启动成功，端口号${APP_PORT}`)
})

