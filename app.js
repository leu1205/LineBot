const linebot = require('linebot');
const koa = require('koa');
const router = require('./route');
const app = new koa();

app.use(router.routes());

var bot = linebot({
    channelId: '1621025919',
    channelSecret: '377bbe253460bbd5ec813237a166bebe',
    channelAccessToken: 'ul7ogOUFWmy8wY7AfbyA+61Iuw70AON+dTw5AA0jN74xvsTBPTFXDw0PMlltA8YOmGwkbKroMjzafFctpi8+zPCxTT0HljjsVP7IYOF/iwzDb4UpPaPTsLuThIvZhohtWsH0Tq+5MvpgoMYeipln3gdB04t89/1O/w1cDnyilFU='
});

bot.on('message',function(event){
    event.reply(event.message.text).then(function(data){
        
    }).catch(function(error){

    });
});

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});

/*app.listen(3000,function(){
    console.log('Connected！');
});*/