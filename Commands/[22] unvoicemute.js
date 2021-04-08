const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const qdb = require('quick.db')
const kdb = new qdb.table("kullanici")
const moment = require('moment')
const ms = require('ms')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.MuteStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))



     let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
     if(!member) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.mute @vorsee/ID <zaman> <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription('Kendinizi muteleyemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(member.id === message.guild.OwnerID)  return message.channel.send(new MessageEmbed().setDescription('Sunucu sahibini muteleyemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription('Senden üstün bir kullanıcıyı muteleyemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
let sebep = args.slice(1).join(" ")
if(!sebep) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.mute @vorsee/ID <zaman> <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))

kdb.add(`puan.${member.id}.cezapuan`, -10)



member.voice.setMute(false)
client.channels.cache.get(voucher.Channels.MuteLog).send(new MessageEmbed().setDescription(`
Bir Kullanıcının  ses mutesi kalktı!

Mutelenen Kullanıcı: ${member} \`(${member.user.tag} - ${member.id})\`
Muteleyen Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`
Sebep: \`${sebep}\``).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())


};
    exports.conf = {aliases: ['unvmute']};
    exports.help = {name: 'unvmute'}
