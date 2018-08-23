const Sequelize = require('sequelize')
const config = {
  database: 'vote',
  username: 'root',
  password: 'szdtb',
  host: '127.0.0.1',
  port: 3306
}
const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql', // 数据库方言
	dialectOptions: {
		charset: "utf8mb4",
		collate: "utf8mb4_unicode_ci",
		supportBigNumbers: true,
		bigNumberStrings: true
	},
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	},
	define: {
		timestamps: false
	}
})

module.exports = {
  sequelize
}
