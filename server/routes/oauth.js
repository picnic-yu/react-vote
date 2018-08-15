
var request = require('request');

const Router = require('koa-router')

const router = new Router({
  prefix: '/api'
})
/* 微信登陆 */
var AppID = 'wx7cdd5e1b8c037a66';
var AppSecret = '4db0747616ee9b03bc3a67d12d498e3c';
router.get('/getUserInfo', (ctx,next) => {
    ctx.body = ctx.userinfo;
})
router.get('/get_wx_access_token/:code',  async (ctx,next)=>{
    //console.log("get_wx_access_token")
    //console.log("code_return: "+req.query.code)
    
    // 第二步：通过code换取网页授权access_token
    var code = ctx.params.code;
    ctx.session.nickname = 'dd';
    ctx.body = 1;
    await request.get(
        {   
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            if(response.statusCode == 200){
                
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                //console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
                
                 request.get(
                    {
                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
                    },
                    function(error, response, body){
                        if(response.statusCode == 200){
                            
                            // 第四步：根据获取的用户信息进行对应操作
                            var userinfo = JSON.parse(body);
                            const user = JSON.stringify(userinfo);
                            //console.log(JSON.parse(body));
                            console.log(userinfo)
                            
                            ctx.session.nickname = userinfo.nickname;
                            ctx.session.openid = userinfo.openid;
                            ctx.session.headimgurl = userinfo.headimgurl;
                            console.log(ctx.session.openid)
		console.log(ctx.session.headimgurl)
		
                        }else{
                            console.log(response.statusCode);
                        }
                    }
                );
            }else{
                console.log(response.statusCode);
            }
        }
    );
});


module.exports = router
