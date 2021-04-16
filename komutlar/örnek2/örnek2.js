const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {

    const sahip = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter("Erdem Tarafından hazırlanmıştır.")
    .setTimestamp()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(' **İşte beni hazırlayan arkadaş** <@325207123686457344> ')
    .setImage('https://cdn.discordapp.com/attachments/828268781087358979/832639867674034206/dccbbe53b41638dd62732eb994fe134c.png');
    message.channel.send(sahip)
};

exports.conf = { 
  enabled: true,
  guildOnly: false,
  aliases: ['sahip','sahibim','Sahip','Sahibim'],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};