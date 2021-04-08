const { MessageEmbed } = require('discord.js');
const voucher = require('../Supervizor/voucher.json');
const vorsee = require('../vorsee.json');
module.exports.run = async(client, message, args) => {
    if(![voucher.Permissions.RegisterStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(voucher.Colors.Red).setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setFooter(voucher.Other.status).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout:15000}));
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) return message.channel.send(new MessageEmbed().setColor(voucher.Colors.Gold).setDescription('Lütfen doğru bir argüman kullanın').setFooter(`Örnek kullanım: ${vorsee.prefix ? vorsee.prefix : ""}kayıtsız @vorsee/ID`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
    if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription('Kendinizi kayıtsıza atamazsınız.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
    if(member.id === message.guild.OwnerID)  return message.channel.send(new MessageEmbed().setDescription('Sunucu sahibini kayıtsıza atamazsın.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
    if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription('Senden üstün bir kullanıcıyı kayıtsıza atamazsın.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

        member.roles.add(voucher.Roles.kayıtsız);
        member.roles.cache.forEach(r => {
            member.roles.remove(r.id)
        });
        

        message.channel.send(new MessageEmbed().setColor(voucher.Colors.Gold).setDescription('Kullanıcı başarıyla kayıtsıza atıldı!').setFooter(voucher.Other.status).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
        message.react(voucher.Emojies.True)





};

exports.conf = {aliases: ['kayıtsız', 'unregister']};
exports.help = {name: 'kayıtsız'}