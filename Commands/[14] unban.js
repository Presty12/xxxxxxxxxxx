const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.BanStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
 
  
  var guild = message.guild
  var banham = message.author.tag
  var member = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  if(!member) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.unban @vorsee/ID <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))
  var reason = args.slice(1).join(" ")
  let banx = await message.guild.fetchBans();
  if(!banx) return message.channel.send(new MessageEmbed().setDescription('Bu kullanıcı yasaklanmamış').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
 if(reason) {
   try {
     await message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcının banı \`${banham}\` tarafından açıldı\n Açılma Sebebi ${reason}`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
 await client.channels.cache.get(voucher.Channels.BanLog).send(new MessageEmbed().setDescription(`${member} kullanıcının banı \`${banham}\` tarafından açıldı\n Açılma Sebebi ${reason}`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())
     await guild.members.unban(member.id, reason);
   }catch(error) {
     
     console.log(error)
   }
 } else {
   try {
       await message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcının banı \`${banham}\` tarafından açıldı`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
 await client.channels.cache.get(voucher.Channels.BanLog).send(new MessageEmbed().setDescription(`${member} kullanıcının banı \`${banham}\` tarafından açıldı`).setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())
     await guild.members.unban(member.id);
   }catch(error) {
     
     console.log(error)
   
   }
 }
  
  
  
};

exports.conf = {aliases: ['unban']};
exports.help = {name: 'unban'}
