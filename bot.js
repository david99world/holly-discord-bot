/**
 * A Discord bot in the style of Red Dwarf's Holly
 */

// Import the discord.js module
const Discord = require('discord.js');
const hltb = require('howlongtobeat');
const commands = require('./commands.js');
const auth = require('./token/auth.json');


const holly = 'Holly-game-bot';

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  if (message.author.username != holly && message.content.startsWith(commands.getHltbCommand())) {
    writeHltbMessage(message);
  }
});

async function writeHltbMessage(message) {
  let gameId = '';
  let hltbService = new hltb.HowLongToBeatService();
  await hltbService.search(message.content.slice(5)).then(function (response) {
    gameId = response[0].id;
  });
  await hltbService.detail(gameId).then(result => {
    var output = result.name + " main story is " + result.gameplayMain + 
    "hrs, extras " + result.gameplayMainExtra + "hrs and completion " + result.gameplayCompletionist + "hrs";
    console.log(output);
    message.channel.send(output);
      
  });
}

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);