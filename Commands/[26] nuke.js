const { Message, MessageEmbed } = require('discord.js')
const voucher = require('../Supervizor/voucher.json')
module.exports.run = async(client, message, args) => {

if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new MessageEmbed().setColor(voucher.Colors.Red).setDescription('Bu komudu kullanmak için **KANALLARI YÖNET** iznine sahip olmalısınız')).then(x => x.delete({timeout: 10000}));

message.channel.clone().then((c) => {
  c.setParent(message.channel.parent.id)
  c.setPosition(message.channel.position)
  c.send(new MessageEmbed().setColor(voucher.Colors.Green).setDescription(`Kanalı sktim attım`)).then(x => x.delete({timeout: 30000}));
  message.channel.delete()
})
};

exports.conf = {aliases: ['nuke']};
exports.help = {name: 'nuke'}
