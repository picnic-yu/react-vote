const Router = require('koa-router')
const ScoreController = require('../controllers/score')
const router = new Router({
  prefix: '/api/score'
})

router
  .post('/create', ScoreController.createScore)  // 
  .get('/getAverage', ScoreController.getAverage) // 获取平均数
//   .get('/userInfo', ScoreController.getUserName) // 获取用户信息

module.exports = router
