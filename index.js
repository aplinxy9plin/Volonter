const bodyParser = require('body-parser')
const express = require('express')
const { Botact } = require('botact')

const app = express()
const bot = new Botact({
  confirmation: 'c73ff738',
  token: '68166c63cdcb38859a45f2c95db106bd3b90393e9715bd7a77373dc4b604863f41373c1c64d58b84e5baa'
})

bot.command('start', ({ reply }) => reply('This is start!'))
bot.hears(/(car|tesla)/, ({ reply }) => reply('I love Tesla!'))
bot.event('group_join', ({ reply }) => reply('Thanks!'))
bot.on(({ reply }) => reply('What?'))

app.use(bodyParser.json())
app.post('/', bot.listen)
app.listen(3000)
