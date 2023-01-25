const { MessageActionRow,
  MessageButton, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const { token, mongodb } = require('../../config.json');

const { MongoClient } = require("mongodb");

const dbclient = new MongoClient(mongodb);
const { SlashCommandBuilder } = require('@discordjs/builders');

const { connectors, firstOption, secondOption, thirdOption } = require('../../constants.json');




module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;


  const userid = interaction.user.id;

  const database = dbclient.db('KdrPlayers');
  const trappers = database.collection('trappers');

  const query = { playerid: userid };
  const options = {
    sort: { "kdr": -1 },
  };
  const user_in_db = await trappers.findOne(query, options);

  if (user_in_db != null) {
    if (user_in_db.convstatus === 0) {
      const filter = { playerid: userid };
      const updateplayerstatus = {
        $set: {
          convstatus: 1,
        },
      };
      const result = await trappers.updateOne(filter, updateplayerstatus);

      return;
    }
    else
      if (user_in_db.convstatus === 1) {

        if (interaction.customId === 'buildtrap') {

          const filter = { playerid: userid };
          const updateplayerstatus = {
            $set: {
              convstatus: 2,
            },
          };
          const result = await trappers.updateOne(filter, updateplayerstatus);

          const row = new MessageActionRow();


          if(firstOption.length<=3)
          {
            for (i in firstOption)
            (
              row.addComponents(new MessageButton()
                .setCustomId(firstOption[i].id)
                .setLabel(firstOption[i].title)
                .setStyle(1))
            )

          var message = connectors[0]

          for (i in firstOption)
            (
              message = message + "\n" + firstOption[i].title + ": " + firstOption[i].description
            )
          }
          else
          {
            
            var arr = [];
            while(arr.length < 3){
                var r = Math.floor(Math.random() * firstOption.length);
                if(arr.indexOf(r) === -1) arr.push(r);
            }
            

            for (i in arr)
            (
              row.addComponents(new MessageButton()
                .setCustomId(firstOption[arr[i]].id)
                .setLabel(firstOption[arr[i]].title)
                .setStyle(1))
            )

            

          var message = connectors[0]

          for (i in arr)
            (
              message = message + "\n" + firstOption[arr[i]].title + ": " + firstOption[arr[i]].description
            )

          }

          

          await interaction.reply({ content: message, ephemeral: true, components: [row] });

        }
        else if (interaction.customId === 'cancel') {
          const filter = { playerid: userid };
          const updateplayerstatus = {
            $set: {
              convstatus: 0,
            },
          };
          const result = await trappers.updateOne(filter, updateplayerstatus);
          await interaction.reply({ content: "You have stopped building a trap", ephemeral: true });
        }
      }
      else
        if (user_in_db.convstatus === 2) {
          for (i in firstOption) {
            if (interaction.customId === firstOption[i].id) {


              const filter = { playerid: userid };
              const updateplayerstatus = {
                $set: {
                  convstatus: 3,
                  timefirstoption: Date.now(),
                  traptitle: connectors[0]+" "+ firstOption[i].title,
                  trapeff: firstOption[i].description
                },
              };
              const result = await trappers.updateOne(filter, updateplayerstatus);

              const row = new MessageActionRow();

              if(secondOption.length<=3)
              {

                for (i in secondOption)
                (
                  row.addComponents(new MessageButton()
                    .setCustomId(secondOption[i].id)
                    .setLabel(secondOption[i].title)
                    .setStyle(1))
                )

              var message = connectors[1]

              for (i in secondOption)
                (
                  message = message + "\n" + secondOption[i].title + ": " + secondOption[i].description
                )

                  ;
              await interaction.reply({ content: message, ephemeral: true, components: [row] });

              }
              else
              {
                var arr = [];
                while(arr.length < 3){
                    var r = Math.floor(Math.random() * secondOption.length);
                    if(arr.indexOf(r) === -1) arr.push(r);
                }
  

                for (i in arr)
                (
                  row.addComponents(new MessageButton()
                    .setCustomId(secondOption[arr[i]].id)
                    .setLabel(secondOption[arr[i]].title)
                    .setStyle(1))
                )

              var message = connectors[1]

              for (i in arr)
                (
                  message = message + "\n" + secondOption[arr[i]].title + ": " + secondOption[arr[i]].description
                )

                  ;
              await interaction.reply({ content: message, ephemeral: true, components: [row] });
    
              }

             

            }
          }

        }
        else
          if (user_in_db.convstatus === 3) {

            for (i in secondOption) {
              if (interaction.customId === secondOption[i].id) {


                const filter = { playerid: userid };
                const updateplayerstatus = {
                  $set: {
                    convstatus: 4,
                    timesecondoption: Date.now(),
                    traptitle: user_in_db.traptitle + connectors[1]+" "+ secondOption[i].title,
                    trapeff: user_in_db.trapeff + secondOption[i].description
                  },
                };
                const result = await trappers.updateOne(filter, updateplayerstatus);

                const row = new MessageActionRow();

                if(thirdOption.length<=3)
                {

                  
                for (i in thirdOption)
                (
                  row.addComponents(new MessageButton()
                    .setCustomId(thirdOption[i].id)
                    .setLabel(thirdOption[i].title)
                    .setStyle(1))
                )

              var message = connectors[2]

              for (i in thirdOption)
                (
                  message = message + "\n" + thirdOption[i].title + ": " + thirdOption[i].description
                )

                  ;
              await interaction.reply({ content: message, ephemeral: true, components: [row] });

                }
                else
                {

                  var arr = [];
                while(arr.length < 3){
                    var r = Math.floor(Math.random() * thirdOption.length);
                    if(arr.indexOf(r) === -1) arr.push(r);
                }

                  
                for (i in arr)
                (
                  row.addComponents(new MessageButton()
                    .setCustomId(thirdOption[arr[i]].id)
                    .setLabel(thirdOption[arr[i]].title)
                    .setStyle(1))
                )

              var message = connectors[2]

              for (i in arr)
                (
                  message = message + "\n" + thirdOption[arr[i]].title + ": " + thirdOption[arr[i]].description
                )

                  ;
              await interaction.reply({ content: message, ephemeral: true, components: [row] });

                }



              }

            }
          }
          else
            if (user_in_db.convstatus === 4) {

              for (i in thirdOption) {
                if (interaction.customId === thirdOption[i].id) {


                  const filter = { playerid: userid };
                  const updateplayerstatus = {
                    $set: {
                      convstatus: 5,
                      timethirdoption: Date.now(),
                      traptitle: user_in_db.traptitle + connectors[2]+" "+ thirdOption[i].title,
                      trapeff: user_in_db.trapeff + thirdOption[i].description
                    },
                  };
                  const result = await trappers.updateOne(filter, updateplayerstatus);

                  const row = new MessageActionRow().addComponents([new MessageButton()
                    .setCustomId("firetrap")
                    .setLabel("Reveal your Trap!")
                    .setStyle(4),
                    new MessageButton()
                    .setCustomId("destroytrap")
                    .setLabel("Destroy your Trap!")
                    .setStyle(2)
                  ]);

                  await interaction.reply({ content: "<@"+user_in_db.playerid+"> 's "+"Trap Is Ready to FIRE!", ephemeral: false });
                  await interaction.followUp({ content: "**" + user_in_db.traptitle + connectors[2]+" "+ thirdOption[i].title + "** \n" + user_in_db.trapeff + thirdOption[i].description, ephemeral: true , components: [row]});


                }

              }

            }
            else
              if (user_in_db.convstatus === 5) {
                if (interaction.customId === "firetrap") {

                  await interaction.reply({ content: "<@"+user_in_db.playerid+"> 's "+"Trap Activated!: \n "+"\n" +"**"+ user_in_db.traptitle +"**"+ "\n" + "\n" +user_in_db.trapeff, ephemeral: false });

                  const filter = { playerid: userid };
                  const updateplayerstatus = {
                    $set: {
                      convstatus: 0,
                      timefirstoption: null,
                      timesecondoption: null,
                      timethirdoption: null,
                      traptitle: "",
                      trapeff: ""
                    },
                  };
                  const result = await trappers.updateOne(filter, updateplayerstatus);

                }
                else if (interaction.customId === "destroytrap")
                {
                  await interaction.reply({ content: "<@"+user_in_db.playerid+"> Has Destroyed Their Trap!", ephemeral: false });

                  const filter = { playerid: userid };
                  const updateplayerstatus = {
                    $set: {
                      convstatus: 0,
                      timefirstoption: null,
                      timesecondoption: null,
                      timethirdoption: null,
                      traptitle: "",
                      trapeff: ""
                    },
                  };
                  const result = await trappers.updateOne(filter, updateplayerstatus);

                }

              }
  }
}