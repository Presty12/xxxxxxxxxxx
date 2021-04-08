const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')

module.exports.run = async (client, message, args) => {
  if(![voucher.Permissions.Ability].some(staff => message.member.roles.cache.get(staff)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

let guild = voucher.Other.Guild
  const voice = message.guild.channels.cache.filter(c => c.type === 'voice');
  let ses = 0;
  for (const [id, vc] of voice) ses += vc.members.size;

var count = message.guild.members.cache.size.toString().replace(/ /g, "  ")
var c = count.match(/([0-9])/g)
count = count.replace(/([a-zA-Z])/g, "Bulunamadı").toLowerCase()
if(c) {
    count = count.replace(/([0-9])/g, c => {
       return {

            "0": `<a:sifir:816569158803259432>`,
            "1": `<a:bir:816569158266257429>`,
            "2": `<a:iki:816569158664847410>`,
            "3": `<a:uc:816569159033946113>`,
            "4": `<a:dort:816569158807453716>`,
            "5": `<a:bes:816569158535872542>`,
            "6": `<a:alti:816569158531022848>`,
            "7": `<a:yedi:816569158790545419>`,
            "8": `<a:sekiz:816569159495974932>`,
            "9": `<a:dokuz:816569158027182091>`,

       }[c]
    })
}


var sesx = ses.toString().replace(/ /g, "  ")
var x = sesx.match(/([0-9])/g)
sesx = sesx.replace(/([a-zA-Z])/g, "Bulunamadı").toLowerCase()
if(x) {
    sesx = sesx.replace(/([0-9])/g, x => {
       return {

            "0": `<a:sifir:816569158803259432>`,
            "1": `<a:bir:816569158266257429>`,
            "2": `<a:iki:816569158664847410>`,
            "3": `<a:uc:816569159033946113>`,
            "4": `<a:dort:816569158807453716>`,
            "5": `<a:bes:816569158535872542>`,
            "6": `<a:alti:816569158531022848>`,
            "7": `<a:yedi:816569158790545419>`,
            "8": `<a:sekiz:816569159495974932>`,
            "9": `<a:dokuz:816569158027182091>`,

      }[x]
    })
}

let tagy = 0;
message.guild.members.cache.forEach(member => {if(member.user.username.includes(voucher.Symbols.tag)) {tagy = tagy+1}})

var tagx = tagy.toString().replace(/ /g, "  ")
var y = tagx.match(/([0-9])/g)
tagx = tagx.replace(/([a-zA-Z])/g, "Bulunamadı").toLowerCase()
if(y) {
    tagx = tagx.replace(/([0-9])/g, y => {
       return {

            "0": `<a:sifir:816569158803259432>`,
            "1": `<a:bir:816569158266257429>`,
            "2": `<a:iki:816569158664847410>`,
            "3": `<a:uc:816569159033946113>`,
            "4": `<a:dort:816569158807453716>`,
            "5": `<a:bes:816569158535872542>`,
            "6": `<a:alti:816569158531022848>`,
            "7": `<a:yedi:816569158790545419>`,
            "8": `<a:sekiz:816569159495974932>`,
            "9": `<a:dokuz:816569158027182091>`,

      }[y]
    })
}




var booster = message.guild.members.cache.filter(f => f.roles.cache.has(voucher.Roles.booster)).size.toString().replace(/ /g, "  ")
var b = booster.match(/([0-9])/g)
booster = booster.replace(/([a-zA-Z])/g, "Bulunamadı").toLowerCase()
if(b) {
    booster = booster.replace(/([0-9])/g, b => {
       return {

            "0": `<a:sifir:816569158803259432>`,
            "1": `<a:bir:816569158266257429>`,
            "2": `<a:iki:816569158664847410>`,
            "3": `<a:uc:816569159033946113>`,
            "4": `<a:dort:816569158807453716>`,
            "5": `<a:bes:816569158535872542>`,
            "6": `<a:alti:816569158531022848>`,
            "7": `<a:yedi:816569158790545419>`,
            "8": `<a:sekiz:816569159495974932>`,
            "9": `<a:dokuz:816569158027182091>`,

      }[b]
    })
}



var online = message.guild.members.cache.filter(f => f.presence.status !== "offline").size.toString().replace(/ /g, "  ")
var z = online.match(/([0-9])/g)
online = online.replace(/([a-zA-Z])/g, "Bulunamadı").toLowerCase()
if(z) {
    online = online.replace(/([0-9])/g, z => {
       return {

            "0": `<a:sifir:816569158803259432>`,
            "1": `<a:bir:816569158266257429>`,
            "2": `<a:iki:816569158664847410>`,
            "3": `<a:uc:816569159033946113>`,
            "4": `<a:dort:816569158807453716>`,
            "5": `<a:bes:816569158535872542>`,
            "6": `<a:alti:816569158531022848>`,
            "7": `<a:yedi:816569158790545419>`,
            "8": `<a:sekiz:816569159495974932>`,
            "9": `<a:dokuz:816569158027182091>`,

      }[z]
    })
}

const say = new MessageEmbed()
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setColor(voucher.Colors.Gold)
.setFooter(voucher.Other.status)
.setTimestamp()
.setDescription(`
**Sunucumuzda toplam ${count} adet üye bulunmakta**
**Sunucumuzada toplam ${booster} adet booster üye bulunmakta**
**Sunucumuzda toplam ${tagx} adet taglı üye bulunmakta**
**Sunucumuzdaki sesli kanallarda toplam ${sesx} adet üye bulunmakta**
**Sunucumuzda toplam ${online} çevrimiçi üye bulunmakta**`)
message.channel.send(say)


};

exports.conf = {aliases: ['say']}
exports.help = {name: 'say'}
