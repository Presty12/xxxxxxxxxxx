const { MessageEmbed } = require('discord.js')
const qdb = require('quick.db')
const voucher = require('../Supervizor/voucher.json')
const vorsee = require('../vorsee.json')
module.exports.run = async(client, message, args) => {
    if(![voucher.Permissions.RegisterStaff].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(voucher.Colors.Red).setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setFooter(voucher.Other.status).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout:15000}));
  let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  let isim = args[1]
let yas = Number(args[2])
if(!member || !isim || !yas) return message.channel.send(new MessageEmbed().setColor(voucher.Colors.Gold).setDescription('Lütfen doğru bir argüman kullanın').setFooter(`Örnek kullanım: ${vorsee.prefix ? vorsee.prefix : ""}erkek @vorsee/ID vorsee 15`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription('Kendinizi kayıt edemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
if(member.id === message.guild.OwnerID)  return message.channel.send(new MessageEmbed().setDescription('Sunucu sahibini kayıt edemezsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))
if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription('Senden üstün bir kullanıcıyı kayıt edemezsin.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))


if(!member.user.username.includes(voucher.Symbols.tag) && !member.roles.cache.has(voucher.Roles.vip) && !member.roles.cache.has(voucher.Roles.booster)) return message.channel.send(new MessageEmbed().setColor(voucher.Colors.Gold).setDescription('Sunucumuz taglı alımdadır! Tag alıp veya boost basıp sunucuya giriş yapabilirsiniz')).then(x => x.delete({timeout: 10000})); 

  
  if(member.roles.cache.has(voucher.Roles.erkek) || member.roles.cache.has(voucher.Roles.erkek2) || member.roles.cache.has(voucher.Roles.kadın) || member.roles.cache.has(voucher.Roles.kadın2)) return message.channel.send(new MessageEmbed().setColor(voucher.Colors.Green).setDescription(`Bu kullanıcı zaten kayıt edilmiş.`).setFooter(voucher.Other.status).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
  
  if(member.user.username.includes(voucher.Symbols.tag)) {
    member.roles.add(voucher.Roles.tagrol)
        member.roles.add(voucher.Roles.kadın)
             member.roles.add(voucher.Roles.kadın2)
                member.roles.remove(voucher.Roles.kayıtsız)
                    member.setNickname(`${voucher.Symbols.tag} ${isim} | ${yas}`)
    } else if(!member.user.username.includes(voucher.Symbols.tag)){
        member.roles.add(voucher.Roles.kadın)
            member.roles.add(voucher.Roles.kadın2)
                member.roles.remove(voucher.Roles.kayıtsız)
                    member.setNickname(`${voucher.Symbols.untag} ${isim} | ${yas}`)
    };
       

   qdb.add(`vorsee.${message.author.id}.kadın`, 1)
   qdb.add(`vorsee.${message.author.id}.toplam`, 1)
   let toplam = qdb.fetch(`vorsee.${message.author.id}.toplam`)
   qdb.add(`vorsee.${member.id}.isimler`, 1)
   qdb.push(`isimler.${member.id}`, {staff: message.author.id, user: member.id, name: isim, age: yas, role: `${voucher.Roles.erkek}`});

   
   message.channel.send(new MessageEmbed().setColor(voucher.Colors.Blue).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp().setDescription(`
   ${member} kullanıcı <@&${voucher.Roles.kadın}> olarak kayıt edildi.`)).then(x => x.delete({timeout: 20000}));
   message.react(voucher.Emojies.True);

   client.channels.cache.get(voucher.Channels.KayıtLog).send(new MessageEmbed().setColor(voucher.Colors.Random).setFooter(voucher.Other.status).setTimestamp().setDescription(`
   Kayıt olan kullanıcı: ${member} \`${member.user.tag} - ${member.id}\`
   Kayıt eden yetkili: ${message.author} \`${message.author.tag} - ${message.author.id}\` 
   Yetkilinin toplamda ${toplam} adet teyiti bulunmaktadır`))
};
exports.conf = {aliases: ['k', 'kadın']};
exports.help = {name: 'kadın'}