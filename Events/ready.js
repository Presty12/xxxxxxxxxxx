
const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../vorsee.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(
    `${client.user.tag} ismi ile giriş yaptım`
  );

}