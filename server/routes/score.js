const Router = require('koa-router')
const ScoreController = require('../controllers/score')
const router = new Router({
  prefix: '/api/score'
})

router
  .post('/create', ScoreController.createScore)  // 
  .post('/getuser/member', ScoreController.getUserByMember)  // 
  .get('/getAverage', ScoreController.getAverage) // 获取平均数
  .get('/getWxUserList', ScoreController.getWxUserList) // 获取用户信息

module.exports = router
