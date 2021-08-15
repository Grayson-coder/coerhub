const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

// 读取私钥和公钥
const private_key = fs.readFileSync(path.join(__dirname, '../', 'keys', 'private.key')).toString()
const public_key = fs.readFileSync(path.join(__dirname, '../', 'keys', 'public.key')).toString()

class Token {
    // 生成token
    setToken(userinfo = {},) {
        // 传入用户信息和私钥进行加密
        const token = jwt.sign(userinfo, private_key, {
            expiresIn: 60 * 60 * 24,  // 设置token过期时间
            algorithm: 'RS256'
        })
        return token
    }
    // 验证token
    verify_Token(token) {
        return new Promise((resolve, reject) => {
            // 传入token和公钥验证token是否过期
            jwt.verify(token, public_key, { algorithms: ['RS256'] }, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })

    }
}
module.exports = new Token()




