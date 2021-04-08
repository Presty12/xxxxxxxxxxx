const { MessageEmbed } = require('discord.js');
const database = require('quick.db');
const voucher = require('../Supervizor/voucher.json');
module.exports.run = async(client , message, args) => {
    if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed().setDescription('Lütfen doğru bir argüman kullanın').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter('.rolbilgi @vorsee/ID').setTimestamp()).then(x => x.delete({timeout: 10000}));

let data = database.fetch(`roleadd.${member.id}`);
let data2 = database.fetch(`roleremove.${member.id}`);

let verilen_rol = database.fetch(`rol.${member.id}.ekle`)
let alınan_rol = database.fetch(`rol.${member.id}.al`)

let toplam = verilen_rol + alınan_rol
if(toplam === null) toplam = "0";
if(toplam === undefined) toplam = "0";

let rolverme = data.filter(x => x.user === member.id).map((value) => `${voucher.Emojies.True} Rol verildi. Rol: ${value.role} Yetkili: <@${value.staff}>
Tarih: ${value.date}
⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺`).reverse().slice(0, 5);
let rolalma = data2.filter(x => x.user === member.id).map((value) => `${voucher.Emojies.False} Rol Alındı. Rol: ${value.role} Yetkili: <@${value.staff}>
Tarih: ${value.date}
⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺`).reverse().slice(0, 5);

if(!rolalma) return message.channel.send(new MessageEmbed().setDescription('Kullanıcıdan hiç rol alınmamış!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
if(!rolverme)  return message.channel.send(new MessageEmbed().setDescription('Kullanıcıya hiç rol verilmemiş!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

let rollerembed = new MessageEmbed()
.setAuthor(member.user.tag, member.user.avatarURL({dynamic:true}))

.setDescription(`
${member.user.tag} Kişinin toplamda ${toplam} rol bilgisi bulunmakta. Son 5 alınan ve verilen rollerin bilgileri aşağıda kategorize edilmiştir

        **Verilen Roller**

${rolverme.join("\n")}

        **Alınan Roller**

${rolalma.join("\n")}`)
.setColor("RANDOM")
message.channel.send(rollerembed)


};

exports.conf = {aliases: ['rolbilgi']};
exports.help = {name: 'rolbilgi'}