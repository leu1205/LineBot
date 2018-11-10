const Router = require('koa-router');
const crypto = require('crypto');
const router = Router();

router.post('/linewebhook', function(ctx, next){
    const channelSecret = '377bbe253460bbd5ec813237a166bebe';
    const hash = crypto.createHmac('sha256', channelSecret)
        .update(Buffer.from(JSON.stringify(ctx.request.body), 'utf-8')).digest('base64');
    
        if(ctx.request.headers['x-line-signature'] === hash){
            ctx.status = 200;
        }else{
            ctx.body = 'Unauthorized!';
            ctx.status = 401;
        }

    await next();
});

module.exports = router;