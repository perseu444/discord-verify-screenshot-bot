const { Client, Intents } = require('discord.js');
const Tesseract = require('tesseract.js');
require('dotenv').config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const token = process.env.TOKEN
const channelId = process.env.CHANNEL_ID
const youtubeChannelName = process.env.YOUTUBE_CHANNEL_NAME
const roleName = process.env.ROLE_NAME

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    client.user.setPresence({
        activities: [{ name: 'no Tigrinho', type: 'PLAYING' }], 
        status: 'online', 
    });
});

client.on('messageCreate', async (message) => {


    if (message.channelId !== channelId ) {
        return;
    }

    if (!message.author.bot) {

        setTimeout(async () => {
            try {
                await message.delete();
            } catch (error) {
                console.error('Erro ao excluir mensagem:', error);
            }
        }, 3000);
    }

    if (message.attachments.size > 0) {
        const attachment = message.attachments.first();
        const responseMessage = await message.reply('Analisando a captura de tela...');

        try {
            const result = await Tesseract.recognize(attachment.url, 'eng', { logger: m => console.log(m) });
            const text = result.data.text.toLowerCase();

            
            const hasPerseu = text.includes(youtubeChannelName);
            const hasSubscribed = text.includes('subscribed');
            const hasInscrito = text.includes('inscrito');
            const hasSubscrito = text.includes('subscrito');

            if (hasPerseu && (hasSubscribed || hasInscrito || hasSubscrito)) {
                
                const guild = message.guild;
                const role = guild.roles.cache.find(role => role.name === roleName);
                const member = guild.members.cache.get(message.author.id);
                await member.roles.add(role);
                await responseMessage.edit(`${message.author}, você recebeu o cargo de Verificado!`);

            } else {
                await responseMessage.edit(`${message.author}, houve um erro ao analisar a print, mande novamente.`);
            }
            setTimeout(async () => {
                try {
                    await responseMessage.delete();
                } catch (error) {
                    console.error('Erro ao excluir mensagem:', error);
                }
            }, 10000); 
        } catch (error) {
            console.error(error);
            await responseMessage.edit('Ocorreu um erro ao analisar a captura de tela.');
        }

        
        setTimeout(async () => {
            try {
                await message.delete();
            } catch (error) {
                console.error('Erro ao excluir mensagem:', error);
            }
        }, 5000); 
    }

});

client.login(token);
