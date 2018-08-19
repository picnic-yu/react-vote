const scoreModel = require('../models/score')

class ScoreController {

  /**
   * 创建用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  	static async createScore (ctx) {
		 
		const score = ctx.request.body;
		
	
		if (score.score && score.openid) {
			const existUser = await scoreModel.findOneByOpenid(score.openid,score.member);
			console.log(existUser,'existUser')
			if(existUser){
				return ctx.body = {
					code: 100,
					message: '该记录已经存在'
				}
			}else{
				await scoreModel.createScore(score)
				ctx.body = {
					code: 200,
					message: '创建成功'
				}
			}
            
		} else {
			ctx.body = {
				code: -1,
				message: '参数错误'
			}
		}
	}

	static async getAverage (ctx) {
		const list = await scoreModel.getAvarageScoreList();	
		console.log(list,'results')
		ctx.body = {
			code: 200,
			message: '创建成功',
			content:list
		}
	}
	static async getWxUserList (ctx) {
		const list = await scoreModel.getWxUserList();	
		console.log(list,'results')
		ctx.body = {
			code: 200,
			message: '创建成功',
			content:list
		}
	}
	
}

module.exports = ScoreController

