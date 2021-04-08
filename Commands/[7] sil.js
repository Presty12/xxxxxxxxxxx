const { MessageEmbed } = require('discord.js')
const qdb = require('quick.db')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.RegisterStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
  let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

  

if(!member) {
if(!message.member.roles.cache.has(voucher.Permissions.RegisterStaff)) 
 return message.channel.send(new MessageEmbed().setDescription(`Bu kullanıcının kayıt verilerini sıfırlayamam çünkü bu kullanıcıda <@&${voucher.Permissions.RegisterStaff}> rolü yok`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

let e = qdb.delete(`vorsee.${message.author.id}.erkek`)
let k = qdb.delete(`vorsee.${message.author.id}.kadin`)
let t = qdb.delete(`vorsee.${message.author.id}.toplam`)
};


if(member) {
if(!member.roles.cache.has(voucher.Permissions.RegisterStaff)) 
 return message.channel.send(new MessageEmbed().setDescription(`Bu kullanıcının kayıt verilerini sıfırlayamam çünkü bu kullanıcıda <@&${voucher.Permissions.RegisterStaff}> rolü yok`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

let e = qdb.delete(`vorsee.${member.id}.erkek`)
let k = qdb.delete(`vorsee.${member.id}.kadin`)
let t = qdb.delete(`vorsee.${member.id}.toplam`)
};


message.channel.send(new MessageEmbed().setDescription('Kayıt verileriniz başarıyla sıfırlandı.').setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
};

exports.conf = {aliases: ['kayıtsil', 'teyitsil']}
exports.help = {name: 'kayıtsil'}
