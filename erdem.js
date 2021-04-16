const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./ayarlar.json")
const fs = require("fs");
const db = require('quick.db')
const AsciiTable = require('ascii-table');
const { prefix } = require("./ayarlar.json"); 
const {MessageEmbed}= require("discord.js"); 
client.config = require(`${process.cwd()}\\ayarlar.json`);
const moment = require('moment'); 
require('moment-duration-format')
var erdem = new AsciiTable("Komut listesi");
client.komutlar = new Discord.Collection();
client.aliases = new Discord.Collection();

client.on('ready', () => {
  client.user.setActivity(' Erdem ');
 })


erdem.setHeading("Komutlar", 'Durum','Aliases')
fs.readdirSync('./komutlar').forEach(dir => {
const commandFiles = fs.readdirSync(`./komutlar/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const komutlarr = require(`./komutlar/${dir}/${file}`);
  if (komutlarr.help.name) {
  client.komutlar.set(komutlarr.help.name, komutlarr);
  erdem.addRow(komutlarr.help.name, "✔️",komutlarr.conf.aliases)
} else {
  erdem.addRow(komutlarr.help.name, "❌")
  continue;
    }
    komutlarr.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutlarr.help.name);
    });
  }
})
console.log(erdem.toString())
  

client.on("message", message => {
  const client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let args = message.content.split(' ').slice(1);
  let yetkiler = client.elevation(message);
  let cmd;
  if (client.komutlar.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.komutlar.get(client.aliases.get(command));
  }
  if (cmd) {
    if (yetkiler < cmd.conf.permLevel) return;
    cmd.run(client, message, args, yetkiler);
  }
});



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if(message.author.id === config.erdem ) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  return permlvl;
};


process.on('uncaughtException', function(err) { 
  console.log(err) 
})

client.on('error', error =>{
  console.error('The websocket connection encountered an error:', error);
});
const express = require("express");
const http = require("http");
const { timeStamp } = require('console');
const app = express();
app.get("/", (request, response) => {
});

client.login(config.token).then(console.log("Başarılı bir şekilde giriş yapldı")).catch(err => console.error("Bir hata oluştu | hata: "+err));