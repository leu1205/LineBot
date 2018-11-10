const Router = require('koa-router');
const crypto = require('crypto');
const router = Router();

router.post('/linewebhook',async function(ctx, next){
    const channelSecret = '377bbe253460bbd5ec813237a166bebe';
    const KoaRequest = ctx.request;
    const json = JSON.stringify(KoaRequest.body);
    const replyToken = json.events[0].replyToken;
    const hash = crypto.createHmac('sha256', channelSecret)
              .update(Buffer.from(json, 'utf8'))
              .digest('base64');
    console.log(json);
    if(KoaRequest.headers['x-line-signature'] === hash){
        ctx.status = 200;
    }else{
        if(replyToken === '00000000000000000000000000000000' || replyToken === 'ffffffffffffffffffffffffffffffff'){
            ctx.status = 200;
        }else{
            ctx.body = 'Unauthorized!';
            ctx.status = 401;
        }
    }

    await next();
});

module.exports = router;