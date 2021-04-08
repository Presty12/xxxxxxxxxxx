const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
const vorsee = require('../vorsee.json')
module.exports.run = async(client, message, args) => {
    if(!message.member.roles.cache.has(voucher.Roles.booster) && !message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send(new MessageEmbed().setColor(voucher.Colors.Red).setDescription(`Bu komudu kullanabilmek için <@&${voucher.Roles.booster}> rolüne sahip olmalısınız.`).setTimestamp().setFooter(voucher.Other.status)).tehn(x => x.delete({timeout: 10000}));
    } 
let isim = args.slice(1).join(" ")
if(isim.length > 20) return  message.channel.send(new MessageEmbed().setColor(voucher.Colors.Gold).setDescription('Kullanıcı adınız 20 harften fazla olamaz!').setFooter(`${vorsee.prefix ? vorsee.prefix : ""}me vorsee 15`).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));

if(!isim || !yas) return  message.channel.send(new MessageEmbed().setColor(voucher.Colors.Gold).setDescription('Lütfen doğru bir argüman kullanın').setFooter(`${vorsee.prefix ? vorsee.prefix : ""}me vorsee 15`).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
    let rek = ['.gg', 'discord.gg', '.net', '.com', '.xyz', '.tk', '.co']
    if(rek.some(r => isim.toLowerCase().includes(rek))) {
        message.channel.send(new MessageEmbed().setColor(voucher.Colors.Gold).setDescription('Adınıza reklam içerikli uzantılar koyamazsınız.').setFooter(voucher.Other.status).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
    }
if (!message.member.user.username.includes(voucher.Symbols.tag)) {
  message.member.setNickname(`${voucher.Symbols.untag ? voucher.Symbols.untag : ""} ${isim}`)
} else if (message.member.user.username.includes(voucher.Symbols.tag)) {
    message.member.setNickname(`${voucher.Symbols.tag ? voucher.Symbols.tag : ""} ${isim}`)
};


};
exports.conf = {aliases: ['bisim', 'me']};
exports.help = {name: 'booster-isim'}