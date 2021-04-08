const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const qdb = require('quick.db')
const kdb = new qdb.table("kullanici")
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));





if(!member) {
let cezapuan = kdb.fetch(`puan.${message.author.id}.cezapuan`)
let jailpuan = kdb.fetch(`jailpuan.${message.author.id}.puan`)
let mutepuan = kdb.fetch(`mutepuan.${message.author.id}.puan`)
if(cezapuan === null) cezapuan = "0"
  if(cezapuan === undefined) cezapuan = "0"
  if(jailpuan === null) jailpuan = "0"
  if(jailpuan === undefined) jailpuan = "0"
  if(mutepuan === null) mutepuan = "0"
  if(mutepuan === undefined) mutepuan = "0"
message.channel.send(new MessageEmbed().setDescription('Toplam ' + cezapuan + ' adet puanınız bulunmaktadır! (' + jailpuan + ') Puan Jail / (' + mutepuan + ') Puan Mute' ).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
} else if(member) {
  let cezapuan = kdb.fetch(`puan.${member.id}.cezapuan`)
let jailpuan = kdb.fetch(`jailpuan.${member.id}.puan`)
let mutepuan = kdb.fetch(`mutepuan.${member.id}.puan`)
  if(cezapuan === null) cezapuan = "0"
  if(cezapuan === undefined) cezapuan = "0"

  if(jailpuan === null) jailpuan = "0"
  if(jailpuan === undefined) jailpuan = "0"
  if(mutepuan === null) mutepuan = "0"
  if(mutepuan === undefined) mutepuan = "0"
  message.channel.send(new MessageEmbed().setDescription('Kullanıcının toplam ' + cezapuan + ' adet puanı bulunmaktadır! (' + jailpuan + ') Puan Jail / (' + mutepuan + ') Puan Mute').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

}









};

exports.conf = {aliases: ['cezapuan']};
exports.help = {name: 'cezapuan'}
