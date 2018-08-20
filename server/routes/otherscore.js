
const Router = require('koa-router')
const OtherScoreController = require('../controllers/otherscore')
const router = new Router({
  prefix: '/api/otherscore'
})

router
  .post('/create', OtherScoreController.createScore)  // 
  .get('/getAverage', OtherScoreController.getAvarageScoreList) // 获取平均数
//   .get('/userInfo', ScoreController.getUserName) // 获取用户信息

module.exports = router
