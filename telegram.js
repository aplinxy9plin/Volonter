const Telegraf = require('telegraf')
const { Extra, Markup } = require('telegraf')

const app = new Telegraf('544182117:AAEw77tjm3IwWpMAxHM35d02QBBq999-1EI')

app.command('start', ({ from , reply}) => {
  var chat_id = from.id
  reply('Йоу, ты уже готов окунуться в приключения волонтерства? Тогда поехали. Вот тебе список заданий на сегодня', Markup
    .keyboard(['Легкое','','','Среднее','','','Сложное'])
    .resize()
    .extra()
  )
})
app.on('message', (ctx) => {
  var message = ctx.update.message.text
  switch (message) {
    case 'Легкое':
      ctx.reply('Итак. Сегодня тебе нужно отгадать загадку! Висит груша - нельзя скушать. Что это?\n\nВернуться к заданиям: /start')
      break;
    case 'Среднее':
      ctx.reply('Сделай репост из группы платнаяПиццерия, платнаяКАЛЬЯННАЯ\n\nВернуться к заданиям: /start',Extra.HTML().markup((m) =>
        m.inlineKeyboard([
          m.callbackButton('Пиццерия', 'https://vk.com/aplinxy9plin'),
          m.callbackButton('Кальянная', 'https://vk.com/mvlounge')
        ])))
      break;
    case 'Сложное':
      ctx.reply('Сгоняй сюда и сделай фотку на фоне Гоголя в позе лотоса\n\nВернуться к заданиям: /start')
      sendLiveLocation(ctx)
      break;
    default:
      if(message  == 'Лампочка' || message == 'лампочка'){
        ctx.reply('КРАСАВА, ВОТ ТЕБЕ 5 БАЛЛОВ\n\nВернуться к заданиям: /start')
      }else{
        ctx.reply('НУ ТЫ ЧО ЭТО ЖЕ ЛАМПОЧКАА\n\nВернуться к заданиям: /start')
      }
  }
})

function sendLiveLocation (ctx) {
  let lat = 56.4602633
  let lon = 84.9551301
  ctx.replyWithLocation(lat, lon, { live_period: 60 }).then((message) => {
    const timer = setInterval(() => {
      lat += Math.random() * 0.001
      lon += Math.random() * 0.001
      ctx.telegram.editMessageLiveLocation(lat, lon, message.chat.id, message.message_id).catch(() => clearInterval(timer))
    }, 1000)
  })
}

app.startPolling()
