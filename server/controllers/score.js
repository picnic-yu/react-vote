const scoreModel = require('../models/score')

class ScoreController {

  /**
   * 创建用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  	static async createScore (ctx) {
		  console.log(ctx)
		console.log(ctx.session.nickname)
		const score = ctx.request.body;
		console.log(ctx.session.openid)
		console.log(ctx.session.headimgurl)
		// const userInfo = ctx.cookies.get('userInfo');
		// console.log(userInfo,'userInfo')
		if (score.score ) {
			

			// return ctx.body = {
            //     code: 1,
            //     message: '创建成功'
            // };
			// const existUser = await scoreModel.findUserByName(user.name)
			// if (existUser) {
			// 	ctx.body = {
			// 		code: -1,
			// 		message: '用户名已经存在'
			// 	}
			// } else {
			// 	// 密码加密
			// 	await scoreModel.createScore(score)
			// 	const newUser = await scoreModel.findUserByName(user.name)


			// 	ctx.body = {
			// 		code: 1,
			// 		message: '创建成功'
			// 	}
            // }
            
            await scoreModel.createScore(score)
            ctx.body = {
                code: 1,
                message: '创建成功'
            }
		} else {
			ctx.body = {
				code: -1,
				message: '参数错误'
			}
		}
	}

	
}

module.exports = ScoreController

