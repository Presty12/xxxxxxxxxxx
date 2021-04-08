const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const chalk = require('chalk');
const vorsee = require('./vorsee.json');
const voucher = require('./Supervizor/voucher.json');
const ms = require('ms');
const { waitForDebugger } = require('inspector');
const path = require('path');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const express = require('express');
const moment = require('moment');
var Jimp = require('jimp');
const db = require('quick.db');

client.on("ready", async() => {
client.user.setPresence({ activity: { name: "Herrscher 💜 Marina" }, status: "idle" });
    let voice = client.channels.cache.get(voucher.Channels.BotVoice);
    if(voice) voice.join()
});

const log = message => {console.log(`${message}`);};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./Commands/', (err, files) => {
if (err) console.error(err);
log(`Toplam ${files.length} Adet Komut Yükleniyor...`);
files.forEach(f => {
let props = require(`./Commands/${f}`);
log(`BOT | ${props.help.name} Komutu Yüklendi.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {client.aliases.set(alias, props.help.name);});});});

client.reload = command => {return new Promise((resolve, reject) => {try {delete require.cache[require.resolve(`./Commands/${command}`)];
let cmd = require(`./Commands/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.load = command => {return new Promise((resolve, reject) => {try {let cmd = require(`./Commands/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.unload = command => { return new Promise((resolve, reject) => { try {delete require.cache[require.resolve(`./Commands/${command}`)];
let cmd = require(`./Commands/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});resolve();} catch (e) {reject(e);}});};
client.login(vorsee.token);
client.elevation = message => {
if (!message.guild) {return;}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === vorsee.sahip) permlvl = 4; return permlvl;};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));});
client.on('error', e => {console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));});
client.on("guildMemberAdd", async member => {
 member.roles.add(voucher.Roles.kayıtsız)
});

client.on("guildMemberAdd", async member => {
member.setNickname(`${voucher.Symbols.tag} ${member.user.username}`)
});

client.on("guildMemberAdd", async member => {
    require('moment-duration-format')
    var count = member.guild.members.cache.size.toString().replace(/ /g, "  ")
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

let vorseex = client.users.cache.get(member.id)
require('moment-duration-format')
const time = new Date().getTime() - vorseex.createdAt.getTime()
const timex = moment.duration(time).format(`Y [Yıl] MM [Ay] DD [Gün] HH [Saat] mm [Dakika]`)
const y = moment(member.user.createdAt).format("DD")
const xy = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
const xc = moment(member.user.createdAt).format("YYYY")
const xz = moment(member.user.createdAt).format("HH:mm")
let xxx = `${y} ${xy} ${xc} | ${xz}`
var safety ;
if(time > 1296000000) safety = `${voucher.Emojies.Real}`
if(time < 1296000000) safety = `${voucher.Emojies.Fake}`
    moment.locale("tr");
let channel = client.channels.cache.get(voucher.Channels.WelcomeChat)
channel.send(`
**Sunucumuza Hoşgeldin ${member} \`(${member.id})\`**

**Hesabın  \`${xxx}\` tarihinde \`(${timex} önce)\` oluşturulmuş ${safety}**

**Sunucumuza kayıt olduğunuzda kurallar kanalındaki (<#${voucher.Channels.Rules}>) kuralları okumuş sayılırsınız ve buna göre ceza-i işlemler uygulanır.**

**Seninlie birlikte ${count} kişiye ulaştık! Tagımızı \`(${voucher.Symbols.tag})\` alarak bize destek olabilirsin! Kayıt olmak için ses kanallarına geçip ses teyit vermelisin seninle <@&${voucher.Permissions.RegisterStaff}> ilgilenecektir. İyi Eğlenceler!**`)
});


client.on("message", message => {
    if(message.content.toLowerCase() == ".tag")
    return message.channel.send(voucher.Symbols.tag)
});



client.on('guildMemberAdd', async(member) => {
    let mute = member.guild.roles.cache.find(r => r.name === "Muted");
    let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
    let süre = db.fetch(`süre_${member.id + member.guild.id}`)
    if (!mutelimi) return;
    if (mutelimi == "muteli") {
    member.roles.add(voucher.Penal.Muted);

    member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
     setTimeout(function(){
    db.delete(`muteli_${member.guild.id + member.id}`)
        member.send(`<@${member.id}> Muten açıldı.`)
        member.roles.remove(voucher.Penal.Muted);
      }, ms(süre));
    }
    })




    client.on('guildMemberAdd', async member => {
    const data = require('quick.db')
    const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
    if(asd) {
    let data2 = await data.fetch(`jailrol_${member.guild.id}`)
    let rol = member.guild.roles.cache.get(data2)
    if(!rol) return;
    let kişi = member.guild.members.cache.get(member.id)
    kişi.roles.add(rol.id);
    kişi.roles.cache.forEach(r => {
    kişi.roles.remove(r.id)
    data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
        data.set(`${member.guild.id}.jail.${kişi.id}`)
      const wasted = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
      .setColor(`#0x800d0d`)
      .setDescription(`Cezalıyken Sunucudan Çıktığın için Yeniden Cezalıya Atıldın!`)
      .setTimestamp()
        member.send(wasted)
    }


    })
