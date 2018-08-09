const Router = require('koa-router')
const ScoreController = require('../controllers/score')
const router = new Router({
  prefix: '/api/score'
})

router
  .post('/create', ScoreController.createScore)  // 
//   .post('/createUser', ScoreController.createUser) // 注册
//   .get('/userInfo', ScoreController.getUserName) // 获取用户信息

module.exports = router
