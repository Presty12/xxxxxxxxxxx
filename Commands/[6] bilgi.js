const { MessageEmbed } = require('discord.js')
const qdb = require('quick.db')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.RegisterStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
  let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) {
  let e = qdb.fetch(`vorsee.${message.author.id}.erkek`)
  let k = qdb.fetch(`vorsee.${message.author.id}.kadın`)
  let t = qdb.fetch(`vorsee.${message.author.id}.toplam`)
  if(e === null) e = "0"
  if(k === null) k = "0"
  if(t === null) t = "0"
  if(e === undefined) e = "0"
  if(k === undefined) k = "0"
  if(t === undefined) t = "0"

  message.channel.send(new MessageEmbed().setDescription(`Toplam ${t} adet kaydınız bulunmaktadır. Bunların ${e} tanesi erkek, ${k} tanesi kadın`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 20000}))

};

if(member) {
  let e1 = qdb.fetch(`vorsee.${member.id}.erkek`)
  let k1 = qdb.fetch(`vorsee.${member.id}.kadın`)
  let t1 = qdb.fetch(`vorsee.${member.id}.toplam`)
  if(e1 === null) e1 = "0"
  if(k1 === null) k1 = "0"
  if(t1 === null) t1 = "0"
  if(e1 === undefined) e1 = "0"
  if(k1 === undefined) k1 = "0"
  if(t1 === undefined) t1 = "0"

  message.channel.send(new MessageEmbed().setDescription(`Toplam ${t1} adet kaydınız bulunmaktadır. Bunların ${e1} tanesi erkek, ${k1} tanesi kadın`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 20000}))




};
  
};


exports.conf = {aliases: ['bilgi', 'teyitsay', 'kayıtbilgi']}
exports.help = {name: 'bilgi'}
