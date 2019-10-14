/**
 * A Discord bot in the style of Red Dwarf's Holly
 */

// Import the discord.js module
const Discord = require('discord.js');
const hltb = require('howlongtobeat');
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
    writeSteamSaleMessage(message);
  }
  if (message.content.startsWith(hltbCommand)) { 
    var gameId = 36936;
    writeHltbMessage(message, gameId);
  }
});

function writeSteamSaleMessage(message) {
  message.channel.send(getSteamSaleMessage());
}

function writeHltbMessage(message, gameId) {
  let hltbService = new hltb.HowLongToBeatService();
  hltbService.detail(gameId).then(result => {
    message.channel.send(result.name);
  });
}

function getSteamSaleMessage() {
  return 'next steam sale is ' + steamsale.getSteamSale() + ', ' + Math.floor((steamsale.getTimeUntilSteamSale() / (1000 * 60 * 60 * 24))) + ' days away!';
}

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);