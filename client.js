const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const Discord = require('discord.js');
const axios = require('axios');
const path = require('path');

const catApiUrl = 'https://api.thecatapi.com/v1/images/search';
const catFactsApiUrl = 'https://catfact.ninja/fact';
const dogApiNinjasUrl = 'https://api-ninjas.com/v1/facts?category=dog';
const factsFilePath = path.join(__dirname, 'facts.json');

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.THECATAPI,
};

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

client.on('ready', () => {
  console.log(`${client.user.tag} online!`);
  setInterval(() => {
    const statuses = [
      { name: 'With Hoàng Lan', type: 'STREAMING', url: 'https://twitch.tv/akira_sachiko' },
    ];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status.name, { type: status.type, url: status.url });
  }, 90000);
});

client.on('message', async (message) => {
  const prefix = '*';

  if (message.content.startsWith(`${prefix}help`)) {
      message.reply('cat, avaguild');
  }
  
  if (message.content.startsWith(prefix + 'cat')) {
    try {
      const catResponse = await axios.get(catApiUrl, requestOptions);
      const catImageUrl = catResponse.data[0].url;
      const factResponse = await axios.get(catFactsApiUrl);
      const catFact = factResponse.data.fact;
      const catEmbed = new Discord.MessageEmbed()
        .setColor('#FFC0CB')
        .setTitle('Cat Fact')
        .setDescription(catFact)
        .setImage(catImageUrl);
      message.reply(catEmbed);
    } catch (error) {
      console.error('Error fetching cat information:', error.message);
    }
  }

  if (message.content.startsWith(`${prefix}avaguild`)) {
    try {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const guildId = args[1];
      if (!guildId) {
        return message.reply('Vui lòng nhập Guild_Id máy chủ mà bạn muốn lấy ảnh!');
      }
      const guild = client.guilds.cache.get(guildId);
      if (!guild) {
        return message.reply('Không tìm thấy máy chủ này hãy thử lại');
      }
      const guildIconUrl = guild.iconURL({ format: 'png', dynamic: true, size: 4096 });
      if (!guildIconUrl) {
        return message.reply('Guild không có ảnh đại diện!');
      }
      const guildEmbed = new Discord.MessageEmbed()
        .setColor('#FFC0CB')
        .setTitle(`${guild.name}'s Icon`)
        .setImage(guildIconUrl);
      message.reply(guildEmbed);
    } catch (error) {
      message.reply(error.message);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
