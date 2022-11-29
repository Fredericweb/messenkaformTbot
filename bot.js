const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const cors = require("cors")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})


const { Telegraf } = require('telegraf')

const bot = new Telegraf('5330541921:AAGaSB8MPu0vpkht3QxgSNM5XW7mQiVrGPc')
const msg = `
    *******Bienvenue sur zowblazBot********
    /help - pour plus d'info sur les commande du BOT
`;

const msgHelp = `
    /help - pour plus d'info sur les commande du BOT
    /echo - pour retourner un mot à l'ecran (/echo jeux retourne jeux )
`;
const web_link = "https://formappmessenka.herokuapp.com/";

bot.start((ctx) => {
  ctx.reply("Bienvenu sur zowblazo bot", {
    reply_markup: {
      inline_keyboard: [[{ text: "Nouveau formulaire Messenka", web_app: { url: web_link } }
      ]]
    },
  })

},
);

app.post('/web-data', async (req, res) => {
  const {code} = req.body;
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
      return res.status(500).json({e})
  }
})

bot.help((ctx) => {
  ctx.reply(msgHelp)

})


bot.launch()