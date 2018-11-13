const BestRate_JPY = require('./BestRate_JPY');

module.exports = (bot) => {
    return async (ctx, next) => {
        bot.parse(ctx.request.body);

        bot.on('follow', function (event) {
            event.push(event.source.userId, {
                type: 'text',
                text: "感謝你願意當我的朋友QAQ"
            });
        });

        bot.on('message', function (event) {
            if (event.message.text == "日幣") {
                
                event.reply({
                    type: 'text',
                    text: Best_3()
                });
            } else {
                event.reply(replyMessage(event.message));
            }
        });
    }
}

function Best_3(){
    let JPY = BestRate_JPY();
    return JPY[0].join(":")+"\n"+JPY[1].join(":")+"\n"+JPY[2].join(":");
}

function replyMessage(message) {
    switch (message.type) {
        case 'text':
            return {
                type: 'text',
                text: message.text
            }
        case 'image':
            return {
                type: 'text',
                text: "又傳什麼色色的圖片給我啊"
            }
        case 'file':
            return {
                type: 'text',
                text: "這..有毒嗎?別把我這當雲端空間啊!"
            }
        case 'sticker':
            return {
                type: 'sticker',
                packageId: message.packageId,
                stickerId: message.stickerId
            }
        default:
            return {
                type: 'text',
                text: "恩恩"
            }
    }
}