const Router = require('koa-router');
const linebot = require('linebot');
const router = Router();

const bot = linebot({
    channelId: '1621025919',
    channelSecret: '377bbe253460bbd5ec813237a166bebe',
    channelAccessToken: '0WguYGSk1mxHYKyf00utwtrAt0ebMGA/c3Zop93Q9sbssYMOg9mfRDdMbGHf+3D6mGwkbKroMjzafFctpi8+zPCxTT0HljjsVP7IYOF/iwyqJk3G040FTLigpB38J2X+IuMYB5hUy2D6w3Y1WuxN+AdB04t89/1O/w1cDnyilFU='
});

router.post('/linewebhook',async function(ctx, next){
    if(bot.verify(ctx.request.rawBody, ctx.headers['x-line-signature'])){
        ctx.status = 200;
        console.log(ctx.request.body);
    }else{
        ctx.status = 401;
    }

    await next();
});

module.exports = router;