const Router = require('koa-router');
const crypto = require('crypto');
const router = Router();

router.post('/',async function(ctx, next){
    ctx.body = "Connected";
    await next();
})

router.post('/linewebhook',async function(ctx, next){
    const channelSecret = '377bbe253460bbd5ec813237a166bebe';
    const KoaRequest = ctx.request;
    const json = JSON.stringify(KoaRequest.body);
    console.log(json);
    //const replyToken = json.events.replyToken;
    const hash = crypto.createHmac('sha256', channelSecret)
              .update(KoaRequest.rawBody)
              .digest('base64');
    
    if(KoaRequest.headers['x-line-signature'] === hash){
        ctx.status = 200;
    }else{
        /*if(replyToken === '00000000000000000000000000000000' || replyToken === 'ffffffffffffffffffffffffffffffff'){
            ctx.status = 200;
        }else{*/
            ctx.body = 'Unauthorized!';
            ctx.status = 401;
        //}
    }

    await next();
});

module.exports = router;