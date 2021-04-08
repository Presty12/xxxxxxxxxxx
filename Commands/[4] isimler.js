const { MessageEmbed } = require('discord.js')
const qdb = require('quick.db')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {
    if(![voucher.Permissions.RegisterStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setFooter(voucher.Other.status).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) return message.react(voucher.Emojies.False)
    let base = qdb.fetch(`isimler.${member.id}`)
    if(!base) return message.channel.send(new MessageEmbed().setDescription('Kullanıcının veri tabanında kayıtlı ismi bulunamadı.').setColor(voucher.Colors.Red).setFooter(voucher.Other.status).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
 

    let isimler = base.filter(vorse => vorse.user === member.id).map((d) => `\`${d.name} | ${d.age}\` (<@&${d.role}>)`).slice(0, 20)
if(isimler === null) isimler = "Kullanıcının veri tabanında kayıtlı ismi bulunamadı!"
if(isimler === undefined) isimler = "Kullanıcının veri tabanında kayıtlı ismi bulunamadı!"
let isimlerembed = new MessageEmbed()
.setColor(voucher.Colors.Random)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))
.setDescription(`**Kullanıcının veritabanındaki isimleri;**

${isimler.join("\n")}`)
.setFooter(voucher.Other.status)
.setThumbnail(member.user.avatarURL({dynamic:true}))
.setTimestamp()
message.channel.send(isimlerembed).then(x => x.delete({timeout: 20000}))
};
exports.conf = {aliases: ['isimler']};
exports.help = {name: 'isimler'}