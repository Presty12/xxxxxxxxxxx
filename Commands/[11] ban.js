const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const qdb = require('quick.db')
const kdb = new qdb.table("kullanici")
const moment = require('moment')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.BanStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
     



     let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
     let reason = args.slice(1).join(" ")
     if(!member || !reason) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.ban @vorsee/ID <sebep>').setTimestamp()).then(x => x.delete({timeout: 10000}))
      if(!member.bannable) return message.channel.send(new MessageEmbed().setDescription('Bu kullancı banlanamaz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription('Kendinizi banlayamazsınız.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(member.id === message.guild.OwnerID)  return message.channel.send(new MessageEmbed().setDescription('Sunucu sahibini banlayamazsın.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription('Senden üstün bir kullanıcıyı banlayamazsın.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
       member.ban({reason: reason});
       kdb.add(`ceza.${member.id}.ban`, 1)
       qdb.add('case', 1)
       let number = await qdb.fetch('case')
       if(number === null) number = "1"
  if(number === undefined) number = "1"
       moment.locale('tr')

      let gün = moment(Date.now()).format("DD")
      let ay = moment(Date.now()).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
      let yıl = moment(Date.now()).format("YYYY")
      let other = moment(Date.now()).format("HH:mm")
      let tarih = `${gün}/${ay}/${yıl} | ${other}`
      moment.locale('tr')


      kdb.push(`sicil.${member.id}`, {staff: message.author.id, user: member.id, ceza: 'BAN', süre: 'SINIRSIZ', cezaıd: number, reason: reason, date: tarih});
      message.channel.send(new MessageEmbed().setDescription(`${member} kullanıcı başarıyla ${message.author} tarafından sunucudan yasaklandı!`).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
       client.channels.cache.get(voucher.Channels.BanLog).send(new MessageEmbed().setDescription(`
Bir Kullanıcı banlandı!

Banlanan Kullanıcı: ${member} \`(${member.user.tag} - ${member.id})\`
Banlayan Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`
Sebep: \`${reason}\`
Tarih: \`${tarih}\``).setColor(voucher.Colors.Gold).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp())
    };
    exports.conf = {aliases: ['ban']};
    exports.help = {name: 'ban'}