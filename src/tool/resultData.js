// 统一接口返回的数据
function resultData(code, message, data) {
    return {
        code,
        message,
        data: data || []
    }
}

module.exports = resultData
