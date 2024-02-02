const Eris = require("eris");
require('./keep_alive.js')
require('./client.js')

const bot = new Eris(process.env.token);

bot.on("error", (err) => {
  console.error(err);
});

bot.on("messageCreate", (msg) => {
  if (msg.content.toLowerCase() === "*stream") {
    console.log("Switching to STREAM status");
    bot.editStatus("dnd", { name: "STREAMING", type: 1, url: "https://twitch.tv/akira_sachiko" });
  } else if (msg.content.toLowerCase() === "*listening") {
    console.log("Switching to LISTENING status");
    bot.editStatus("dnd", { name: "LISTENING", type: 2 });
  } else if (msg.content.toLowerCase() === "*playing") {
    console.log("Switching to PLAYING status");
    bot.editStatus("dnd", { name: "PLAYING", type: 0 });
  } else if (msg.content.toLowerCase() === "*watching") {
    console.log("Switching to WATCHING status");
    bot.editStatus("dnd", { name: "WATCHING", type: 3 });
  }
});

bot.connect();
