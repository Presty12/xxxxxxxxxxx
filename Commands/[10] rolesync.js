const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const database = require('quick.db')
const moment = require('moment')
module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))


    let date = moment(Date.now()).format("DD");
    let date_2 = moment(Date.now()).format("MM");
    let date_3 = moment(Date.now()).format("YYYY");
    let date_4 = moment(Date.now()).format("HH:mm");
    let tarih = `${date}/${date_2}/${date_3} | ${date_4}`;



  let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

  if(!member || !rol) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.rolver @vorsee/ID @rol/ID').setTimestamp()).then(x => x.delete({timeout: 10000}))
  if(member.roles.cache.has(rol)) return message.channel.send(new MessageEmbed().setDescription('Kullanıcıda zaten <@&' + rol.id + '> rolü bulunuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))


  if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription('Senden üstün bir kullanıcıya rol veremezsin!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}));

  member.roles.add(rol)
  database.add(`rol.${member.id}.ekle`, 1);
database.push(`roleadd.${member.id}`, {
    user: member.id,
    staff: message.author.id,
    role: `<@&${rol.id}>`,
    date: tarih
});
message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + rol.id + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))

  
  




  /* if(vors === "vip") {
    member.roles.add(voucher.Roles.vip)
    message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + voucher.Roles.vip + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
};




if(vors === "sorunçözücü") {
    if(member.roles.cache.has(voucher.Roles.sorunCozucu)) {
        message.channel.send(new MessageEmbed().setDescription('Bu kullanıcıda zaten <@&' + voucher.Roles.sorunCozucu + '> rolü bulunuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    } else {
        member.roles.add(voucher.Roles.sorunCozucu)
        message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + voucher.Roles.sorunCozucu + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    };
    
    };

    
    
  if(vors === "terapist") {
    if(member.roles.cache.has(voucher.Roles.terapist)) {
        message.channel.send(new MessageEmbed().setDescription('Bu kullanıcıda zaten <@&' + voucher.Roles.terapist + '> rolü bulunuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    } else {
        member.roles.add(voucher.Roles.terapist)
        message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + voucher.Roles.terapist + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    };
    
    };

    
    
  if(vors === "banstaff") {
    if(member.roles.cache.has(voucher.Permissions.BanStaff)) {
        message.channel.send(new MessageEmbed().setDescription('Bu kullanıcıda zaten <@&' + voucher.Permissions.BanStaff + '> rolü bulunuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    } else {
        member.roles.add(voucher.Permissions.BanStaff)
        message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + voucher.Permissions.BanStaff + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    };
    
    };

    
    
  if(vors === "jailstaff") {
    if(member.roles.cache.has(voucher.Permissions.JailStaff)) {
        message.channel.send(new MessageEmbed().setDescription('Bu kullanıcıda zaten <@&' + voucher.Permissions.JailStaff + '> rolü bulunuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    } else {
        member.roles.add(voucher.Permissions.JailStaff)
        message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + voucher.Permissions.JailStaff + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    };
    
    };

    

    
  if(vors === "registerstaff") {
    if(member.roles.cache.has(voucher.Permissions.RegisterStaff)) {
        message.channel.send(new MessageEmbed().setDescription('Bu kullanıcıda zaten <@&' + voucher.Permissions.RegisterStaff + '> rolü bulunuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    } else {
        member.roles.add(voucher.Permissions.RegisterStaff)
        message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + voucher.Permissions.RegisterStaff + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
    };
    
    };
    

    if(vors === "mutestaff") {
        if(member.roles.cache.has(voucher.Permissions.MuteStaff)) {
            message.channel.send(new MessageEmbed().setDescription('Bu kullanıcıda zaten <@&' + voucher.Permissions.MuteStaff + '> rolü bulunuyor!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
        } else {
            member.roles.add(voucher.Permissions.MuteStaff)
            message.channel.send(new MessageEmbed().setDescription('Kullanıcıya başarıyla <@&' + voucher.Permissions.MuteStaff + '> rolü verildi').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 15000}))
        };
        
        };
*/

};

exports.conf = {aliases: ['rolekle', 'rolver', 'roleadd']};
exports.help = {name: 'rolekle'}
