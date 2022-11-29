const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const cors = require("cors")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const token = '5330541921:AAGaSB8MPu0vpkht3QxgSNM5XW7mQiVrGPc';
const webAppUrl = 'https://formappmessenka.herokuapp.com/';
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Bienvenue sur ZowBlazo BOT', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Nouveau formulaire Messenka', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    // if(msg?.web_app_data?.data) {
    //     try {
    //         const data = JSON.parse(msg?.web_app_data?.data)
    //         console.log(data)
    //         await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
    //         await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
    //         await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

    //         setTimeout(async () => {
    //             await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
    //         }, 3000)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
});

app.post('/web-data', async (req, res) => {
    const {queryId, code} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'code',
            input_message_content: {
                message_text: code
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})