require('dotenv').config();

const Discord = require('discord.js');
const CommandManager = require('./commands/commandManager');
const EventManager = require('./events/eventManager');
const config = require('../config.json');

const allIntents = new Discord.IntentsBitField(32767);
const Logger = require('./utils/logger');

const client = new Discord.Client({ intents: allIntents });
client.config = config;

const commandManager = new CommandManager();
client.commandManager = commandManager;

const eventManager = new EventManager(client);
client.eventManager = eventManager;

eventManager.registerEvents();

commandManager.scanSlashCommand();
commandManager.scanTextCommands();

client.once('ready', async () => {
  await commandManager.registerSlashCommands();
  Logger.success(`[Discord] Connected! You're in as ${client.user.username}`);
  client.user.setActivity('Traptrix in Master Duel');
});

process.on('uncaughtException', (error) => {
  Logger.error(`[Process] Uncaught exception:\n${error.stack}\n`);
  process.exit(1);
});

client.login(process.env.TOKEN);
