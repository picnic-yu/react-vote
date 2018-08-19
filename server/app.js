const Koa = require('koa')
const logger = require('koa-logger');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser')
const router = require('./router');
const static = require('koa-static')
const koaBetterBody = require('koa-better-body')
// const jwt = require('koa-jwt')
const secret = require('./config/secret.json')
// const err = require('./middlreware/error')
const path = require('path');
const app = new Koa();
//设置静态资源的路径 
const staticPath = './public'

app.use(static(
  path.join( __dirname,  staticPath)
))
// app.use(err())
app.use(logger())
app.use(bodyParser())
// app.use(koaBetterBody({
//   fields:'body'
// }));
// app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/login/, /^\/api\/createUser/]}))

app.keys = ['nickname','openid','headimgurl'];
const CONFIG = {
	key: 'koa:sess',   //cookie key (default is koa:sess)
	maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
	overwrite: true,  //是否可以overwrite    (默认default true)
	httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
	signed: true,   //签名默认true
	rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
	renew: true,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
app.use(router());

app.listen(80, () => {
  console.log(`server running success....80`)
})