const Router = require('koa-router')
const UserController = require('../controllers/user')
const router = new Router({
  
})

router.get('/app',(ctx, next)=>{
    ctx.body = render('app/index',{
        title : 'Koa2 Test!'
    });
});
router.get('/vote',(ctx, next)=>{
    ctx.body = render('vote/index',{
        title : 'Koa2 Test!'
    });
});
module.exports = router