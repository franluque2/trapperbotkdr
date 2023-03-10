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
  
  const {auctionmsg}=require('../../constants.json');
  
  
  module.exports = {

    name: 'createauction',
    description: 'Starts an Auction!',
    options:[
      {
        name: 'kdr',
        description: 'The kdr to start the auction in',
        type: 4,
        required: true
    },
    {
        name: 'auctionround',
        description: 'The auction round',
        type: 4,
        required: true
    }
  
    ],
    register_command: new SlashCommandBuilder()
    .setName('createauction')
    .setDescription('Starts an Auction!')
        .addIntegerOption(option =>
            option
                .setName('kdr')
                .setDescription('The kdr to start the auction in')
                .setRequired(true)).addIntegerOption(option =>
                option
                    .setName('auctionround')
                    .setDescription('The auction round')
                    .setRequired(true))			
  ,
      async execute(client, interaction) {
  
          const member = interaction.member;
          var target;
          var kdr;
              if (member.roles.cache.some(role => role.name === 'KDR-Admin')) { //
                  try {

                    

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
  