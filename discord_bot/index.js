const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  //   console.log(message.content);  -> Only the text
  //   console.log(message);          -> All the text information
  if(message.author.bot) return;
  if(message.content.startsWith('create')){
    const url = message.content.split('create')[1];
    return message.reply({
      content : 'Generating Short URL for' + url,
    })
  }
  message.reply({
    content: "Hi, from the bot", //-> but this messages on itself as well so it runs infintely
  });
});

client.on('interactionCreate', (interaction) =>{
  console.log(interaction);
  interaction.reply('Pong!!');
})

client.login(
  process.env.DISCORD_TOKEN,
);
