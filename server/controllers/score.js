const scoreModel = require('../models/score')

class ScoreController {

  /**
   * 创建用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  	static async createScore (ctx) {
		 
		const score = ctx.request.body;
		
		console.log(score,'scorescorescorescore')
		// const userInfo = ctx.cookies.get('userInfo');
		// console.log(userInfo,'userInfo')
		if (score.score && score.openid) {
			const existUser = await scoreModel.findOneByOpenid(score.openid,score.member);
			console.log(existUser,'existUser')
			if(existUser){
				return ctx.body = {
					code: 100,
					message: '该记录已经存在'
				}
			}
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

