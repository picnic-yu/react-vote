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
	// static async findUserByName (name) {
	// 	const userInfo = await User.findOne({
	// 		where: {
	// 			name
	// 		}
	// 	})
	// 	return userInfo
  	// }

	/**
	 * 创建分数
	 * @param score
	 * @returns {Promise.<boolean>}
	 */
	static async createScore (score) {
		await Score.create(score)
		return true
	}
}

module.exports = ScoreModel
