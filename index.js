const Eris = require("eris");
require('./keep_alive.js');
require('./chatbot.js');

const bot = new Eris(process.env.token);

bot.on("error", (err) => {
  console.error(err); 
});

bot.on("messageCreate", async (msg) => {
  if (msg.content.toLowerCase() === "*stream") {
    console.log("Switching to STREAM status");
    bot.editStatus("dnd", { name: "with HoangLan", type: 1, url: "https://twitch.tv/akira_sachiko" });
  } else if (msg.content.toLowerCase() === "*listening") {
    console.log("Switching to LISTENING status");
    bot.editStatus("dnd", 
                   { name: "LISTENING", type: 2 });
    await bot.editStatus("dnd", 
                         { name: "Listening to Spotify", type: 2, url: "https://open.spotify.com", assets: 
                         { lagger_image: "lq" } });
  } else if (msg.content.toLowerCase() === "*playing") {
    console.log("Switching to PLAYING status");
    const assetID = "1193603947198435388";
    bot.editStatus("dnd", 
                   { name: "Playing a game", type: 0, assets: { small_image: assetID } });
  } else if (msg.content.toLowerCase().startsWith("*voice")) {
    const args = msg.content.split(" ");
    if (args.length === 2) {
      const voiceChannelID = args[1];
      console.log(`Connecting to voice channel: ${voiceChannelID}`);
      const voiceChannel = bot.getChannel(voiceChannelID);
      if (voiceChannel && voiceChannel.type === 2) {
        await bot.joinVoiceChannel(voiceChannelID);
      } else {
        console.log("Invalid voice channel ID or not a voice channel.");
      }
    } else {
      console.log("Invalid command format. Use *voice <voice_channel_id>");
    }
  } else if (msg.content.toLowerCase() === "*watching") {
    console.log("Switching to WATCHING status");
    bot.editStatus("dnd", { name: "WATCHING", type: 3 });
  }
});

bot.connect();
