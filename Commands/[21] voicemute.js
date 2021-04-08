const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const qdb = require('quick.db')
const kdb = new qdb.table("kullanici")
const moment = require('moment')
const ms = require('ms')
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
     if(!member) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.mute @vorsee/ID <zaman> <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription('Kendinizi muteleyemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(member.id === message.guild.OwnerID)  return message.channel.send(new MessageEmbed().setDescription('Sunucu sahibini muteleyemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription('Senden üstün bir kullanıcıyı muteleyemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
    let zaman = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
if(!zaman) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.mute @vorsee/ID <zaman> <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))
let sebep = args.slice(2).join(" ")
if(!sebep) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.mute @vorsee/ID <zaman> <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))
let timex = zaman
.replace("s", "Saniye")
.replace("m", "Dakika")
.replace("h", "Saat")
.replace("d", "Gün");

kdb.add(`ceza.${member.id}.mute`, 1)
qdb.add('case', 1)
kdb.add(`puan.${member.id}.cezapuan`, 10)
let number = await qdb.fetch('case')
moment.locale('tr')
kdb.push(`sicil.${member.id}`, {staff: message.author.id, user: member.id, ceza: 'VOICEMUTE', süre: timex, cezaid: number, date: tarih})

qdb.set(`muteli_${member.guild.id + member.id}`, 'muteli')
qdb.set(`süre_${member.id + member.guild.id}`, timex)
message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcı başarıyla ${message.author} tarafından metin kanallarında susturuldu!`).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
if(member.voice.channel) member.voice.setMute(true)
client.channels.cache.get(voucher.Channels.MuteLog).send(new MessageEmbed().setDescription(`
Bir Kullanıcı seste mutelendi!

Mutelenen Kullanıcı: ${member} \`(${member.user.tag} - ${member.id})\`
Muteleyen Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`
Sebep: \`${sebep}\`
Süre: \`${time}\`
Başlangıç Tarihi: \`${tarih}\`
Bitiş Tarihi: \`${btarih}\``).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())

setTimeout(async function()  {
member.voice.setMute(false)
client.channels.cache.get(voucher.Channels.MuteLog).send(new MessageEmbed().setDescription(`
Bir Kullanıcının  ses mutesi kalktı!

Mutelenen Kullanıcı: ${member} \`(${member.user.tag} - ${member.id})\`
Muteleyen Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`
Sebep: \`${sebep}\`
Süre: \`${time}\`
Başlangıç Tarihi: \`${tarih}\`
Bitiş Tarihi: \`${btarih}\``).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())
}, ms(zaman));

};
    exports.conf = {aliases: ['vmute']};
    exports.help = {name: 'vmute'}
