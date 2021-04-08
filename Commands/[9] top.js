const { MessageEmbed } = require('discord.js')
const qdb = require('quick.db')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
let user = message.mentions.users.first();

let list = message.guild.members.cache.filter(user => qdb.get(`vorsee.${user.id}.toplam`)).array().sort((a, b) => Number(qdb.get(`vorsee.${b.id}.toplam`))-Number(qdb.get(`vorsee.${a.id}.toplam`))).slice(0, 10).map((vorsee, index) => `\`${index+1}•\` ${vorsee}: Toplam ` + qdb.get(`vorsee.${vorsee.id}.toplam`) + ` adet kaydı bulunuyor (` + qdb.get(`vorsee.${vorsee.id}.erkek`) + ` Erkek / ` + qdb.get(`vorsee.${vorsee.id}.kadın`) + ` Kadın)`)
message.channel.send(new MessageEmbed().setDescription(`${list.join("\n") || "Topteyit listesi yok!"}`).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 30000}));
};
exports.conf = {aliases: ['topteyit']};
exports.help = {name: 'topteyit'}
