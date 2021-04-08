const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const ms = require('ms')
const moment = require('moment')
const qdb = require('quick.db')
const kdb = new qdb.table("kullanici")
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.MuteStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
    
  let timer = args[1];
  let time = timer.replace(/y/, " Yıl").replace(/d/, " Gün").replace(/h/, " Saat").replace(/m/, " Dakika")
  let date = new Date(Date.now())
  let date2 = ms(timer)
  let date3 = Date.now()+ date2
  let bgün = moment(date3).format("DD")
  let bay = moment(date3).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
  let byıl = moment(date3).format("YYYY")
  let bother = moment(date3).format("HH:mm")
  let btarih = `${bgün}/${bay}/${byıl} | ${bother}`
    let gün = moment(Date.now()).format("DD")
    let ay = moment(Date.now()).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    let yıl = moment(Date.now()).format("YYYY")
    let other = moment(Date.now()).format("HH:mm")
    let tarih = `${gün}/${ay}/${yıl} | ${other}`
    moment.locale('tr')
   



     let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
     let reason = args.slice(1).join(" ")
     if(!member || !reason) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.unmute @vorsee/ID <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))


        
kdb.add(`puan.${member.id}.cezapuan`, -10)
kdb.add(`mutepuan.${member.id}.puan`, -20)
     member.roles.remove(voucher.Penal.Muted)

       message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcının başarıyla ${message.author} tarafından mutesi kaldırıldı!`).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
       client.channels.cache.get(voucher.Channels.MuteLog).send(new MessageEmbed().setDescription(`
Bir Kullanıcının mutesi kaldırıldı!

Kullanıcı: ${member} \`(${member.user.tag} - ${member.id})\`
Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`
Sebep: \`${reason}\`
Başlangıç Tarihi: \`${tarih}\``).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())
    

};

exports.conf = {aliases: ['unmute']};
exports.help = {name: 'unmute'}
