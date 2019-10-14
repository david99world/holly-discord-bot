/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const hltb = require('./hltb.js');
const steamsale = require('./steamsale.js');
const auth = require('./auth.json');

const hltbCommand = '!hltb'
const steamSaleCommand = '!steamsale';

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
  if (message.content === steamSaleCommand) {
    message.channel.send(getSteamSaleMessage());
  }
  if (message.content === hltbCommand) {
    message.channel.send(getHltbMessage());
  }

});

function getSteamSaleMessage() {
  return 'next steam sale is ' + steamsale.getSteamSale() + ', ' + Math.floor((steamsale.getTimeUntilSteamSale() / (1000 * 60 * 60 * 24))) + ' days away!';
}

async function getHltbMessage() {
  var output;
  await hltb.getGame(36936).then(function (result) {
    output = result.name + ' is  about ' + result.gameplayMainExtra + ' hours long';
    console.log(result.name + ' is  about ' + result.gameplayMainExtra + ' hours long');
    console.log('output is ' + output);
  });
  return output;
}

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);