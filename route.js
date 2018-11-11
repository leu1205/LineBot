const Router = require('koa-router');
const linebot = require('linebot');
const echo = require('./echo');
const config = require('./config');
const router = Router();

const bot = linebot({
    channelId: config.channelId,
    channelSecret: config.channelSecret,
    channelAccessToken: config.channelAccessToken
});

router.post('/linewebhook',async function(ctx, next){
    if(bot.verify(ctx.request.rawBody, ctx.headers['x-line-signature'])){
        ctx.status = 200;
    }else{
        ctx.status = 401;
    }

    await next();
},echo(bot));

module.exports = router;