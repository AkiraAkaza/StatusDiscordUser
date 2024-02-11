
require('dotenv').config();
const { Client, Collection, MessageEmbed } = require("discord.js");
const axios = require("axios");

const Discord = require('discord.js');
const client = new Client({
    disableEveryone: true
});

const CLIENT_ID = '1193603947198435388'; 
const channel_id = "1206062578506141696";
const TOKEN = process.env.TOKEN;

const commands = [
    {
        name: 'setchatbot',
        description: 'Chat bot',
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function errorEmbed(text, message) {
    const newEmbed = new Discord.MessageEmbed()
        .setColor("#FF7676")
        .setDescription(`**❌ | ${text} **`);
    return message.channel.send({ embeds: [newEmbed] });
}

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

client.on('message', async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    try {
        if (message.channel.id != channel_id) return;
        let res = await axios.get(`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(message.content)}`);
        message.reply(res.data.cnt);
    } catch {
        errorEmbed(`Bot error, please try again!`, message);
    }
});

client.login(TOKEN);
