const { MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async (client, message, args) => {

const emj = (reaction, user) => {
    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === member.id;
    };
if(!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription('Bu komudu kullanabilmek için bir sesli kanala girmelisin!').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed().setDescription('Bir kullanıcı girmelisin (.git @vorsee/ID)').setColor(voucher.Colors.Red).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()).then(x => x.delete({timeout: 10000}))

const x = new MessageEmbed()
.setColor(voucher.Colors.Gold)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})).setFooter(voucher.Other.status).setTimestamp()
.setDescription(`${member}, ${message.author} ` + member.voice.channel.name + ` adlı kanala gelmek istiyor. Kabul ediyor musun?`)
let msj = await message.channel.send(x)
await msj.react("✅")
await msj.react("❌")
msj.awaitReactions(emj, {
max: 1,
time: 60000,
error: ['time']
}).then(collected => {
    const emoji = collected.first()
    if(emoji.emoji.name === "✅") {
    message.member.voice.setChannel(member.voice.channel.id)
     msj.edit('Kullanıcı odaya gelmeni onayladı!').then(x => x.delete({timeout: 10000}))
    }
     else {
     msj.edit('Kullanıcı odaya gelmeni reddetti!').then(x => x.delete({timeout: 10000}))
}
})
};
exports.conf = {aliases: ['git']};
exports.help = {name: 'git'}