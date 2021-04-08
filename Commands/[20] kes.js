const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

let vc = message.member.voice.channel
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  
  


  
message.guild.member(member.id).voice.setChannel(null)

message.channel.send(new MessageEmbed().setDescription('Kullanıcının ses bağlanıtısı \`' + message.author.tag + '\` tarafından kesildi').setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))


};

exports.conf = {aliases: ['kes']},
exports.help = {name: 'kes'}
