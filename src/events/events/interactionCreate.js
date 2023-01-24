const Logger = require('../../utils/logger');
const buildtrap = require('./buildtrap');

module.exports = async (client, interaction) => {
  if (interaction.isButton())
  {
    try {
      buildtrap(client, interaction);
    } catch (error) {
      console.log(error)
      interaction.reply('Failed to execute button');
    }
  
  }
  else{
  if (!interaction.commandName || !client.commandManager.slashCommands.has(interaction.commandName)) return;
  try {
    client.commandManager.slashCommands.get(interaction.commandName).execute(client, interaction);
  } catch (error) {
    Logger.warn(`We had an error executing ${interaction.commandName}:\n${error.stack}\n`);
    interaction.reply('Failed to execute command');
  }
}
};
