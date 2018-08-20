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
	static async getAvarageScoreList (ctx) {
		let computer_score = await otherScoreModel.getComputer_score();	
		let expert_score = await otherScoreModel.getExpert_score();	
		let computer_scoreArr = [];
		let expert_scoreArr = [];
		computer_score.forEach((item) => {
			computer_scoreArr.push((item.computer_score*.25).toFixed(2));
		});
		expert_score.forEach((item) => {
			expert_scoreArr.push((item.expert_score*.5).toFixed(2));
		});
		ctx.body = {
			code: 200,
			message: '创建成功',
			content:{
				computer_scoreArr,
				expert_scoreArr
			}
		}
	}
}

module.exports = OtherScoreController

