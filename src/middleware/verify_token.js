const { setToken, verify_Token } = require('../tool/token')

// 验证token的全局中间件
module.exports = (req, res, next) => {
    // 1. 从请求头中获取token
    const token = req.headers.authorization
    const path = req._parsedUrl.pathname

    // 2. 如果请求的是登录或注册接口，则不需要验证token
    if (path === '/user/login' || path === '/user/register') {
        // 交给登录/注册接口处理
        return next()

    } else if (req.method === 'GET' && path === '/user/moment') {
        // 所有用户动态的 查询接口 也不需要验证token
        return next()
    } else if (req.method === 'GET' && path === '/user/comment') {
        // 评论列表的 查询接口 也不需要验证token
        return next()
    } else if (req.method === 'GET' && path === '/label/list') {
        // 标签列表的 查询接口 也不需要验证token
        return next()
    } else if (req.method === 'GET' && path === '/label/moment') {
        // 具体动态的 标签列表 查询接口 也不需要验证token
        return next()
    }


    // 3. 判断token是否存在
    if (token === undefined) {
        // 交给错误中间件处理
        return next({ statusCode: 401, message: 'token不存在，请重新登录' })
    }

    // 4. 判断token是否过期
    verify_Token(token).then(data => {
        // token校验成功 -> 交给下一个匹配的中间件处理
        next()
    }).catch(err => {
        // 交给错误中间件处理
        return next({ statusCode: 401, message: 'token已过期，请重新登录' })
    })
}