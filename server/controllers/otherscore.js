const otherScoreModel = require('../models/otherscore.js')

class OtherScoreController {

  /**
   * 创建用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  	static async createScore (ctx) {
		 
		const score = ctx.request.body;
		console.log(score)
	
		if (score.expert_score && score.computer_score && score.member) {
			await otherScoreModel.createScore(score)
            ctx.body = {
                code: 200,
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

module.exports = OtherScoreController

