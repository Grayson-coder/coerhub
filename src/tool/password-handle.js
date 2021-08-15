const bcrypt = require('bcryptjs');

// 密码加密的封装函数 会返回Promise
async function bcryptPassword(password) {
    let salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(password.toString(), salt);
    return newPassword
}

module.exports = bcryptPassword
