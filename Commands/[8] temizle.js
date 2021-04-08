const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
let number = Number(args[0])
if(!number) return message.channel.send(new MessageEmbed().setDescription('Lütfen silinecek mesaj miktarını belirtin.').setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
if(number < 1 || number > 100) return message.channel.send(new MessageEmbed().setDescription('Girdiğiniz değer 1 ile 100 arasında olmalıdır.').setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
message.channel.bulkDelete(number)
message.channel.send(new MessageEmbed().setDescription(`${number} adet mesaj başarıyla temizlendi`).setColor(voucher.Colors.Green).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
};

exports.conf = {aliases: ['temizle']};
exports.help = {name: 'temizle'}
