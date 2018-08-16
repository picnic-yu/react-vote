
var request = require('request');
var rp = require('request-promise');
const Router = require('koa-router')

const router = new Router({
  prefix: '/api'
})
/* 微信登陆 */
var AppID = 'wx7cdd5e1b8c037a66';
var AppSecret = '4db0747616ee9b03bc3a67d12d498e3c';


const getopenid = (url) => {
    return new Promise(function(resolve,reject){
        rp(url).then( (res) => {
            resolve(JSON.parse(res));
        }).catch(function (err) {
            // Crawling failed...
        });
    })
}

const getUserInfo = (url) => {
    return new Promise(function(resolve,reject){
        rp(url).then( (res) => {
            resolve(JSON.parse(res));
        }).catch(function (err) {
            // Crawling failed...
        });
    })
}
router.get('/get_wx_access_token/:code',  async (ctx,next)=>{
    var code = ctx.params.code;
    // ctx.session.nickname = 'dd';
    const openidInfo = await getopenid('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code');
   
    console.log(openidInfo)
    const openid = openidInfo.openid;
    const access_token = openidInfo.access_token;
    let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN';
    const userinfoItem = await getUserInfo(getUserInfoUrl);
    ctx.body = {
        code:200,
        content:userinfoItem,
        message:'请求成功'
    };
});


module.exports = router
