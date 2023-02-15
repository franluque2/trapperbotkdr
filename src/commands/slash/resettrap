const {  
  MessageActionRow,
  MessageButton,
  ButtonStyle,
  Message,
  ComponentType,
  ButtonComponent } = require('discord.js');
const { token,mongodb } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder } = require('@discordjs/builders');


const { MongoClient } =require("mongodb");

const dbclient = new MongoClient(mongodb);

const {constructtrapmsg}=require('../../constants.json');


module.exports = {
  name: 'resettrap',
  description: 'Reset your trap for if/when the bot breaks',
  register_command: new SlashCommandBuilder()
    .setName('resettrap')
    .setDescription('Reset your trap for if/when the bot breaks'),

	async execute(client, interaction) {

    const userid = interaction.user.id;

    const database = dbclient.db('KdrPlayers');
    const trappers = database.collection('trappers');

    const query = { playerid: userid };
    const options = {
      sort: { "kdr": -1 },
    };
    const user_in_db = await trappers.findOne(query, options);



            if (user_in_db!=null) {
              if(user_in_db.convstatus===0)
              {
                try {
                   
                    const filter = { playerid: userid};
                    const updateplayerstatus = {
                        $set: {
                          convstatus: 0,
                          traptitle:"",
                          trapeff:"",
                          timefirstoption:null,
                          timesecondoption:null,
                          timethirdoption:null,
                          additionaleffs:[]
                        },
                      };

                      const result = await trappers.updateOne(filter, updateplayerstatus);

                      await interaction.reply({ content: `Reset your Trap!`, ephemeral: false});
                  
                  } catch(error)
                  {
                    console.log(error)
                  }
            }
          }
          else
          {
            await interaction.reply({ content: `Only Trappers may use this command!`});
          }
		
	},

  
};
