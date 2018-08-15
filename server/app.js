const Koa = require('koa')
const logger = require('koa-logger')
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
app.use(koaBetterBody({
  fields:'body'
}));
// app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/login/, /^\/api\/createUser/]}))


app.use(router());

app.listen(80, () => {
  console.log(`server running success....80`)
})
