const { token,mongodb } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


const { MongoClient } =require("mongodb");

const dbclient = new MongoClient(mongodb);


module.exports = {

  name: 'settrapper',
  description: 'Sets the trapper for the current kdr!',
  register_command: new SlashCommandBuilder()
  .setName('settrapper')
  .setDescription('Sets the trapper for the current kdr!')
      .addUserOption(option =>
      option
      .setName('target')
      .setDescription('The player to set as trapper')
      .setRequired(true))
      .addIntegerOption(option =>
          option
              .setName('kdr')
              .setDescription('The kdr to set the player as trapper in')
              .setRequired(true))		
,
	async execute(client, interaction) {

        const member = interaction.options.getMember('target');
        var target;
        var kdr;
            if (member.roles.cache.some(role => role.name === 'KDR-Admin')) { //
                try {
                    target = interaction.options.getUser('target') ?? "";
                    kdr= interaction.options.getInteger('kdr');

                    const database = dbclient.db('KdrPlayers');
                    const trappers = database.collection('trappers');
                    const filter = { kdr: kdr};

                    const updatePlayerid = {
                        $set: {
                          playerid: target.id,
                          convstatus: 0,
                          traptitle:"",
                          trapeff:"",
                          timefirstoption:null,
                          timesecondoption:null,
                          timethirdoption:null,
                        },
                      };

                      const result = await trappers.updateOne(filter, updatePlayerid);
                      await interaction.reply({ content: `Updated the trapper of kdr ${kdr}, it is now ${target.username}!`});
                  
                    }
                    catch(error)
                    {
                      console.log(error)
                    }
            }
            else
            {
              await interaction.reply({ content: `Only KDR-Admins may use this command!`});
            }
		
	},
};