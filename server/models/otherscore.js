const db = require('../config/db')
const sequelize = db.sequelize
const OtherScore = sequelize.import('../schema/otherscore.js')
// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var otherscore = OtherScore.sync({ force: false });
class OtherScoreModel {
	// /**
	//  * 查询用户信息
	//  * @param name  姓名
	//  * @returns {Promise.<*>}
	//  */
	// static async findOneByOpenid (openid,member) {
	// 	const scoreInfo = await OtherScore.findOne({
	// 		where: {
	// 			openid,
	// 			member
	// 		}
	// 	})
	// 	return scoreInfo
  	// }

	/**
	 * 创建分数
	 * @param score
	 * @returns {Promise.<boolean>}
	 */
	static async createScore (score) {
		await OtherScore.create(score)
		return true
	}
}

module.exports = OtherScoreModel
