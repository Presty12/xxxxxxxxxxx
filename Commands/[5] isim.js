const { MessageEmbed } = require('discord.js')
const qdb = require('quick.db')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.RegisterStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
  let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

   let isim = args[1]
   let yas = Number(args[2])
   if(!isim || !yas)  return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.isim @vorsee/ID vorsee 15').setTimestamp()).then(x => x.delete({timeout: 10000}))
  if(!member) {

    if(!message.member.user.username.includes(voucher.Symbols.tag)) {
      message.member.setNickname(`${voucher.Symbols.untag ? voucher.Symbols.untag : ""} ${isim} | ${yas}`)
    } else if(message.member.user.username.includes(voucher.Symbols.tag)) {
      message.member.setNickname(`${voucher.Symbols.tag ? voucher.Symbols.tag : ""} ${isim} | ${yas}`)
    }

var rol 
if(message.member.roles.cache.has(voucher.Roles.erkek || voucher.Roles.erkek2)) rol = `${voucher.Roles.erkek}`
if(message.member.roles.cache.has(voucher.Roles.kadın || voucher.Roles.kadın2)) rol = `${voucher.Roles.kadın}`
    qdb.push(`isimler.${message.author.id}`, {user: message.author.id, name: isim, age: yas, role: rol})

  }

  if(member) {
    if(!member.user.username.includes(voucher.Symbols.tag)) {
      member.setNickname(`${voucher.Symbols.untag ? voucher.Symbols.untag : ""} ${isim} | ${yas}`)
    } else if (member.user.username.includes(voucher.Symbols.tag)) {
      member.setNickname(`${voucher.Symbols.tag ? voucher.Symbols.tag : ""} ${isim} | ${yas}`)
    }


    var rol 
    if(member.roles.cache.has(voucher.Roles.erkek || voucher.Roles.erkek2)) rol = `${voucher.Roles.erkek}`
    if(member.roles.cache.has(voucher.Roles.kadın || voucher.Roles.kadın2)) rol = `${voucher.Roles.kadın}`
        qdb.push(`isimler.${member.id}`, {user: member.id, name: isim, age: yas, role: rol})

  }


message.channel.send(new MessageEmbed().setDescription('Kullanıcı adınız başarıyla değiştirildi').setColor(voucher.Colors.Green).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
};

exports.conf = {aliases:['nick', 'isim']};
exports.help = {name: 'isim'}
