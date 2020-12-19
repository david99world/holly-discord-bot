/**
 * A Discord bot in the style of Red Dwarf's Holly
 */

// Import the discord.js module
const Discord = require('discord.js');
const hltb = require('howlongtobeat');
const commands = require('./commands.js');

const metacritic = require('metacritic-scraper')
const holly = 'Holly-game-bot';
const auth = require('./token/auth.json');

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
    if (message.guild.available) {
      console.log("Guild name " + message.guild.name);
    }
    writeHltbMessage(message);
  }

  if (message.author.username != holly && message.content.startsWith(commands.getMetaCriticCommand())) {
    if (message.guild.available) {
      console.log("Guild name " + message.guild.name);
    }
    writeMetaCriticMessage(message);
  }
});

async function writeMetaCriticMessage(message) {
 
}

async function writeHltbMessage(message) {
  let gameId = '';
  let hltbService = new hltb.HowLongToBeatService();
  try {
    await hltbService.search(message.content.slice(5)).then(function (response) {
      if (response[0] != null) {
        gameId = response[0].id;
      } else {
        failureMessage = "Sorry no results for" + message.content.slice(5);
        console.log(failureMessage);
        message.channel.send(failureMessage);
      }
    });
    if (gameId != null) {
      await hltbService.detail(gameId).then(result => {
        var output = result.name + " main story is " + result.gameplayMain +
          "hrs, extras " + result.gameplayMainExtra + "hrs and completion " + result.gameplayCompletionist + "hrs";
        console.log(output);
        console.log("REQUEST :: " + result.name);
        message.channel.send(output);
      });
    }
  } catch (err) {
    console.log("Error calling hltb site :: \n " + err)
  }
}

client.login(auth.token);
