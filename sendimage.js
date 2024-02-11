const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const GUILD_ID = '1177135617990205480';
const CHANNEL_ID = '1198439868364247131';
const base_url = 'https://yande.re/post?page=';

client.once('ready', () => {
    console.log('Bot is ready!');
    sendImages();
    setInterval(sendImages, 600000); // 10 minutes in milliseconds
});

async function sendImages() {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (guild) {
        const channel = guild.channels.cache.get(CHANNEL_ID);
        if (channel) {
            for (let page_number = 1; page_number <= 24952; page_number++) {
                const url = `${base_url}${page_number}`;
                try {
                    const response = await axios.get(url);
                    const $ = cheerio.load(response.data);
                    $('img').each((index, element) => {
                        const src = $(element).attr('src');
                        if (src && src.startsWith('https://assets.yande.re/data/')) {
                            channel.send(src);
                        }
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    }
}

client.login(process.env.TOKEN);
