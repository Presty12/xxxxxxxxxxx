const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const qdb = require('quick.db')
const kdb = new qdb.table("kullanici")
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) {
      let data = kdb.fetch(`sicil.${message.author.id}`)
      if(!data) {

        message.channel.send(new MessageEmbed().setDescription('Kullanıcının databasedeki sicil verileri bulunamadı!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

     } else if(data) {
       let sicil = data.filter(x => x.user === message.author.id).map((x, index) => `\`${index+1}•\` <@${x.user}>, \`${x.date}\` tarihinde, \`${x.süre}\` süreliğine <@${x.staff}> tarafından \`${x.ceza}\` cezası yemiştir. \`(#${x.cezaid})\``)
     
     let cp =  kdb.fetch(`puan.${message.author.id}.cezapuan`)

        const sicilembed = new MessageEmbed()
             .setColor(voucher.Colors.Red)
             .setFooter('Kullanıcının hangi ceza türünden toplam kaç cezapuanına sahip olduğuna bakmak için .cezapuan @kullanıcı/ID')
             .setTimestamp()
            .setThumbnail(message.author.avatarURL({dynamic:true}))
            .setTitle(`<@${message.author}> Kullanıcısının sicili;`)
            .setDescription(`${sicil.join("\n") || "Kullanıcının sicili temiz!"}`)
            .addField('Kullanıcının güncel cezapuanı', `${cp}`, true)
                  message.channel.send(sicilembed)
     }
    }

    if(member) {
      let data = kdb.fetch(`sicil.${member.id}`)
      if(!data) {

        message.channel.send(new MessageEmbed().setDescription('Kullanıcının databasedeki sicil verileri bulunamadı!').setColor(voucher.Colors.Red).setAuthor(message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

     } else if(data) {
       let sicil = data.filter(x => x.user === member.id).map((x, index) => `\`${index+1}-\` <@${x.user}>, \`${x.date}\` tarihinde, \`${x.süre}\` süreliğine <@${x.staff}> tarafından \`${x.ceza}\` cezası yemiştir. \`(#${x.cezaid}\`)`)

     let cp =  kdb.fetch(`puan.${member.id}.cezapuan`)

        const sicilembed1 = new MessageEmbed()
             .setColor(voucher.Colors.Red)
             .setFooter('Kullanıcının hangi ceza türünden toplam kaç cezapuanına sahip olduğuna bakmak için .cezapuan @kullanıcı/ID')
             .setTimestamp()
            .setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))
            .setThumbnail(member.user.avatarURL({dynamic:true}))
            .setTitle(`${member.user.tag} Kullanıcısının sicili;`)
            .setDescription(`${sicil.join("\n") || "Kullanıcının sicili temiz!"}`)
            .addField('Kullanıcının güncel cezapuanı', `${cp}`, true)
                  message.channel.send(sicilembed1)
     }
    }




};


exports.conf = {aliases: ['sicil']}
exports.help = {name: 'sicil'}
