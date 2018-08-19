const db = require('../config/db')
const sequelize = db.sequelize
const Score = sequelize.import('../schema/score.js')
// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var score = Score.sync({ force: false });
class ScoreModel {
	// /**
	//  * 查询用户信息
	//  * @param name  姓名
	//  * @returns {Promise.<*>}
	//  */
	static async findOneByOpenid (openid,member) {
		const scoreInfo = await Score.findOne({
			where: {
				openid,
				member
			}
		})
		return scoreInfo
  	}

	/**
	 * 创建分数
	 * @param score
	 * @returns {Promise.<boolean>}
	 */
	static async createScore (score) {
		await Score.create(score)
		return true
	}

	static async getAvarageScoreList () {
		return new Promise((resolve,reject) => {
			sequelize.query("SELECT avg(score) as avg  FROM score GROUP BY member").spread((results, metadata) => {
				// 结果将是一个空数组，元数据将包含受影响的行数。
				resolve(results);
			})
		})
	}
}

module.exports = ScoreModel
