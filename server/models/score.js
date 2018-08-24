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
	// 查询所有的用户列表
	static async getUserList () {
		const user = await Score.findAll({
			
		})
		return user
	}
	// 根据会员查询用户
	static async getUserByMember (member) {
		const userList = await Score.findAll({
			where: {
				member
			}
		})
		return userList
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
	static async getWxUserList () {
		return new Promise((resolve,reject) => {
			// sequelize.query("SELECT avg(score) as avg  FROM score GROUP BY member").spread((results, metadata) => {
			sequelize.query("SELECT openid,nickname,headimgurl  FROM score GROUP BY openid").spread((results, metadata) => {
				// 结果将是一个空数组，元数据将包含受影响的行数。
				resolve(results);
			})
		})
	}
}

module.exports = ScoreModel
