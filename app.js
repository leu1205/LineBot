const linebot = require('linebot');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const app = new koa();
const router = Router();

const bot = linebot({
    channelId: '1621025919',
    channelSecret: '377bbe253460bbd5ec813237a166bebe',
    channelAccessToken: '0WguYGSk1mxHYKyf00utwtrAt0ebMGA/c3Zop93Q9sbssYMOg9mfRDdMbGHf+3D6mGwkbKroMjzafFctpi8+zPCxTT0HljjsVP7IYOF/iwyqJk3G040FTLigpB38J2X+IuMYB5hUy2D6w3Y1WuxN+AdB04t89/1O/w1cDnyilFU='
});

router.post('/linewebhook',async function(ctx, next){
    if(bot.verify(ctx.request.rawBody, ctx.headers['x-line-signature'])){
        this.status = 200;
        bot.parse(ctx.request.body);
        ctx.body = "Connected";
    }else{
        this.status = 401;
    }

    await next();
});


app.use(bodyParser());
app.use(router.routes());

bot.on('message',function(event){
    event.reply(event.message.text).then(function(data){
        
    }).catch(function(error){

    });
});


var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});