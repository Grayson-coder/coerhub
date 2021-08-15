const resultData = require('../tool/resultData')

// 错误处理中间件的处理函数
module.exports = (err, req, res, next) => {
    // console.log('来到了错误处理中间件');

    // 1. 从next()参数中获取状态码和报错信息
    const { statusCode, message } = err
    
    // 2. 给浏览器响应数据
    res.send(resultData(statusCode, message ))
}