const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const qdb = require('quick.db')
const kdb = new qdb.table("kullanici")
const moment = require('moment')
const ms = require('ms')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.MuteStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
    



    let gün = moment(Date.now()).format("DD")
    let ay = moment(Date.now()).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    let yıl = moment(Date.now()).format("YYYY")
    let other = moment(Date.now()).format("HH:mm")
    let tarih = `${gün}/${ay}/${yıl} | ${other}`
    moment.locale('tr')
   


     let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
     let reason = args.slice(1).join(" ")
     if(!member || !reason) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.unmute @vorsee/ID <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))

     let zaman = args[1]
     .replace("sn", "s")
     .replace("dk", "m")
     .replace("sa", "h")
     .replace("gün", "d");
     let timex = zaman
.replace("s", "Saniye")
.replace("m", "Dakika")
.replace("h", "Saat")
.replace("d", "Gün");



qdb.delete(`cezali_${member.guild.id + member.id}`, 'cezali')
qdb.delete(`sürejail_${message.mentions.users.first.id + message.guild.id}`, timex)

kdb.add(`puan.${member.id}.cezapuan`, -20)
kdb.add(`jailpuan.${member.id}.puan`, -20)
     message.guild.roles.cache.forEach(async r => {
        let rols = qdb.fetch(`${message.guild.id}.jail.${member.id}.roles.${r.id}` )
        if(rols != r.id)  return ;
        if(rols){member.roles.add(rols)}
            member.roles.remove(voucher.Penal.Jail)
        })


       message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcının başarıyla ${message.author} tarafından cezası sonlandırıldı!`).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
       client.channels.cache.get(voucher.Channels.JailLog).send(new MessageEmbed().setDescription(`
Bir Kullanıcının cezası sonlandırıldı!

Kullanıcı: ${member} \`(${member.user.tag} - ${member.id})\`
Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`
Sebep: \`${reason}\``).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())
    

};

exports.conf = {aliases: ['unjail']};
exports.help = {name: 'unjail'}
