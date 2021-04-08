const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

    let user1;
    let user2 = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let user3 = message.guild.members.cache.get(args[0])
    if(!user2) return message.channel.send(new MessageEmbed().setDescription('Lütfen komudu doğru kullanın. Kullanımı: .n @vorsee/ID').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
if(user1)
 {
     user1 = user2
 }
 if(user2) {
     user1 = user2
 }

 if(!user1) {
     user1 = message.member
    
 }


 let vc = user1.voice.channel
 if(!vc) { message.channel.send(new MessageEmbed().setDescription('Kullanıcı herhangi bir sesli kanalda değil!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
} else if (vc) {
    message.channel.send(new MessageEmbed().setDescription(`Kullanıcı `  + vc.name + ` isimli kanalda!`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
};
};

exports.conf = {aliases: ['n']};
exports.help = {name: 'nerede'}