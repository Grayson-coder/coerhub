const sqlQuery = require('../../../dataBase/mysql')
const resultData = require('../../../tool/resultData')

module.exports = async (req, res, next) => {
   // 1. 获取要删除的评论id、登录的用户id
   const { commentID } = req.params
   const { user_id } = req.body

   // 2. 判断当前登录的用户是否有删除这条评论的权限
   // 2.1 根据id查询评论数据
   let findSQL = `select * from comment where id = ?`
   let data = await sqlQuery(findSQL, [commentID])
   // 2.2 判断查询到的评论数据中的用户id是否与登录的用户id一致
   if (data[0].user_id != user_id) {
       return next({ statusCode: 401, message: '当前用户无操作权限' })
   }

   // 3. 从数据库中删除评论
   try {
       let editSQL = `delete from comment where id = ?`
       let data = await sqlQuery(editSQL, [commentID])
       res.send(resultData(200, '删除评论成功', data))

   } catch (error) {
       console.log(error);
       return next({ statusCode: 400, message: '删除评论失败' })
   }

}