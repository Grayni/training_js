import {Telegraf} from 'telegraf'
import {message} from 'telegraf/filters'
import config from 'config'
import {ogg} from './ogg.js'

// token
const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

bot.on(message('voice'), async (ctx) => {
    try {
        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)

        // bot id
        const userId = String(ctx.message.from.id)
        const oggPath = await ogg.create(link.href, userId)

        await ctx.reply(JSON.stringify(link, null, 2))

    } catch(e) {
        console.log('Error voice message: ', e.message)
    }
})

bot.command('start', async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.message, null, 2))
})


// bot run
bot.launch()

// bot stop
process.once('SIGIN', () => bot.stop('SIGIN'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
