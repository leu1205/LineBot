module.exports = (bot) => {
    return async (ctx,next) => {
        bot.parse(ctx.request.body);
        
        bot.on('follow',function(event){
            event.push(event.source.userId,{type:'text', text:"感謝你願意當我的朋友QAQ"});
        });
        bot.on('message',function(event){
            console.log(event);
            if(event.message.text == "誰長得像金城武"){
                event.reply({type:'text', text: "當然4你啊"});
            }else{
                event.reply(event.message.text);
            }
        });
    }
}
