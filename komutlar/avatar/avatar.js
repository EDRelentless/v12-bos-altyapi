const Discord = require('discord.js');
const config = require('../../ayarlar.json')
exports.run = (client, message, args) => {

    let kullanıcı = message.mentions.users.first()
    

    if(!args[0]) {
        const avatar = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} kullanıcısının avatarı:`)
            .setImage(message.author.displayAvatarURL({dynamic: true, size: 1024}))
            .setColor("RANDOM")
        return message.channel.send(avatar)
    } 

    if(kullanıcı) {
        const avatar2 = new Discord.MessageEmbed()
            .setAuthor(`${kullanıcı.tag} kullanıcısının avatarı:`)
            .setImage(kullanıcı.displayAvatarURL({dynamic: true, size: 1024}))
            .setColor("RANDOM")
            .setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(avatar2)
    } 

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["profil", "avatar", "pp"],
    permLevel: 0
   };

exports.help = {
    name: 'avatar'
};