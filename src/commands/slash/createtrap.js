const {  
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Message,
  ComponentType,
  ButtonComponent, SlashCommandBuilder } = require('discord.js');
const { token,mongodb } = require('../../config.json');
const { MessageEmbed } = require('discord.js');


const { MongoClient } =require("mongodb");

const dbclient = new MongoClient(mongodb);

const {constructtrapmsg}=require('../../constants.json');


module.exports = {
  name: 'createtrap',
  description: 'Sets up a trap!',
  register_command: new SlashCommandBuilder()
    .setName('createtrap')
    .setDescription('Sets up a trap!'),

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
                            convstatus: 1,
                        },
                      };

                      const result = await trappers.updateOne(filter, updateplayerstatus);

                      await interaction.reply({ content: `Time to set a trap!`, ephemeral: false});

                    const firstmsgcontent=constructtrapmsg;

                    const row =  new ActionRowBuilder().addComponents([
                      new ButtonBuilder()
                        .setCustomId('buildtrap')
                        .setLabel('✅ Yes')
                        .setStyle(3)
                        ,
                        new ButtonBuilder()
                        .setCustomId('cancel')
                        .setLabel('❌No')
                        .setStyle(4)]
                    );
                    await interaction.followUp({ content: firstmsgcontent, ephemeral: true , components: [row]});
                  
                  } catch(error)
                  {
                    console.log(error)
                  }
            }
            else
            {
              await interaction.reply({ content: `You are currently already building a trap, if you aren't, use /resettrap to reset this process`});
            }
          }
          else
          {
            await interaction.reply({ content: `Only Trappers may use this command!`});
          }
		
	},

  
};
