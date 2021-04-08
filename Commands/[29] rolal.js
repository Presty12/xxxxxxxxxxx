const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const database = require('quick.db')
const moment = require('moment')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))


    let date = moment(Date.now()).format("DD");
    let date_2 = moment(Date.now()).format("MM");
    let date_3 = moment(Date.now()).format("YYYY");
    let date_4 = moment(Date.now()).format("HH:mm");
    let tarih = `${date}/${date_2}/${date_3} | ${date_4}`;



  let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

  if(!member || !rol) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.rolal @vorsee/ID @rol/ID').setTimestamp()).then(x => x.delete({timeout: 10000}))
//if(!member.roles.cache.has(rol)) return message.channel.send(new MessageEmbed().setDescription('Kullanıcıda <@&' + rol.id + '> rolü bulunmuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))


  if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription('Senden üstün bir kullanıcıdan rol alamazsın!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}));

  member.roles.remove(rol)
  database.add(`rol.${member.id}.al`, 1);
database.push(`roleremove.${member.id}`, {
    user: member.id,
    staff: message.author.id,
    role: `<@&${rol.id}>`,
    date: tarih
});
message.channel.send(new MessageEmbed().setDescription('Kullanıcıdan başarıyla <@&' + rol.id + '> rolü alındı').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))

  
};

exports.conf = {aliases: ['rolal']};
exports.help = {name: 'rolal'}

