const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const Discord = require("discord.js");
const client = new Discord.Client();

let config = require('./config.json')

let prefix = config.Prefix;

let owners = config.owners;

let timeS = config.Time

client.on("ready", () => {

    console.log(`Logged in as: ${client.user.tag}`);
    console.log(`-> Servers / Members: ${client.guilds.cache.size} server / ${client.users.cache.size} member`);
    console.log(`Developer: Exicsmo`);

});

// Timeout Function

const timeIIa = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

client.on("message", async message => {

    if (!message.channel.guild) return;

    if (message.content === prefix + "bc") {

        if (owners.includes(message.author.id)) {

            let loading = new Discord.MessageEmbed()

                .setTitle("**بــرودكــاسـت**")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(message.member.roles.highest.hexColor)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField("Loading . . .", "Loading . . .")
                .addField("Loading . . .", "Loading . . .")
                .addField("Loading . . .", "Loading . . .")
                .addField("Loading . . .", "**Loading . . .**")
                .setFooter("By Alistar200")

            let embed = new Discord.MessageEmbed()

                .setTitle("**بــرودكــاسـت**")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(message.member.roles.highest.hexColor)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField("🟢", " ارسال الى اعضاء متصلين **فقط ** `[ " + message.guild.members.cache.filter(m => m.presence.status === "dnd" || m.presence.status === "idle" || m.presence.status === "online" && !m.user.bot).size + " ] member`")
                .addField("🟠", " ارسال الى **رتب** ")
                .addField("🔵", " ارسال الى **جميع** اعضاء `[ " + message.guild.memberCount + " ] member`")
                .addField("❌", "**الغاء**")
                .setFooter("By Ali ")

            message.channel.send(loading).then(async (m) => {

                await m.react("🟢");
                await m.react("🟠");
                await m.react("🔵")
                await m.react("❌").then(() => {

                    m.edit(embed);

                })

                let ReactionFilter = (r, user) => {
                    return user.id === message.author.id && ["🟢", "🟠", "🔵", "❌"].includes(r.emoji.name);
                };
                let ReactionCollector = m.createReactionCollector(ReactionFilter, { time: 15000 });

                ReactionCollector.on("collect", re => {

                    if (re.emoji.name === "❌") {

                        m.delete({ timeout: 150 });
                        message.channel.send(`**:x: Canceled by: ${message.member}**`)

                        return;
                    }

                    if (re.emoji.name === "🔵") {

                        m.reactions.removeAll();

                        ReactionCollector.stop("Done2");

                    } else if (re.emoji.name === "🟢") {

                        m.reactions.removeAll();

                        ReactionCollector.stop("Done1");

                    } else if (re.emoji.name === "🟠") {

                        m.reactions.removeAll();

                        ReactionCollector.stop("Done3");

                    }

                });

                ReactionCollector.on("end", async (col, reason) => {

                    if (reason === "Done1") {

                        //Online only

                        let msgEmbed = new Discord.MessageEmbed()

                            .setTitle("**بــرودكــاسـت**")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setColor(message.member.roles.highest.hexColor)
                            .setThumbnail(message.guild.iconURL({ dynamic: true }))
                            .setDescription(":white_check_mark:** | قم بكتابة رسالة **")
                            .setFooter("By alistar200")

                        m.edit(msgEmbed).then(() => {


                            let MsgFilter = m => m.author.id === message.author.id;

                            let MsgCollector = m.channel.createMessageCollector(MsgFilter, { time: 60000, max: 1 });

                            MsgCollector.on("collect", msg => {

                                let SureEmbed = new Discord.MessageEmbed()

                                    .setTitle(" هل تريد ارسال رسالة ?")
                                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                    .setColor(message.member.roles.highest.hexColor)
                                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                    .setDescription(msg.content)
                                    .setFooter("By Alistar200")

                                msg.delete({ timeout: 500 });
                                m.delete({ timeout: 500 });

                                msg.channel.send(SureEmbed).then(async (mSure) => {


                                    await mSure.react("✅");
                                    await mSure.react("❌");

                                    let ReactionFilter = (r, user) => {

                                        return user.id === message.author.id && ["✅", "❌"].includes(r.emoji.name);

                                    }

                                    let ReactionCollector = mSure.createReactionCollector(ReactionFilter, { time: 15000 });

                                    ReactionCollector.on("collect", r => {

                                        if (r.emoji.name === "✅") {


                                            mSure.reactions.removeAll();
                                            ReactionCollector.stop("Done1" + msg.content);

                                        } else if (r.emoji.name === "❌") {

                                            mSure.reactions.removeAll();

                                            ReactionCollector.stop("Done2");

                                        }

                                    })

                                    ReactionCollector.on("end", async (col, reason) => {

                                        if (reason.startsWith("Done1")) {

                                            let msg = reason.replace("Done1", "");

                                            //Send


                                            let sendEmbed = new Discord.MessageEmbed()
                                                .setTitle("**بــرودكــاسـت**")
                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                .setColor(message.member.roles.highest.hexColor)
                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                .setDescription(`:white_check_mark: **| ارسال ... | الى جميع اعضاء : ${message.guild.members.cache.filter(m => m.presence.status === "dnd" || m.presence.status === "idle" || m.presence.status === "online" && !m.user.bot).size}**`)
                                                .setFooter("By alistar200")

                                            mSure.edit(sendEmbed);

                                            let members = message.guild.members.cache.filter(m => m.presence.status === "dnd" || m.presence.status === "idle" || m.presence.status === "online" && !m.user.bot).array();


                                            for (var i = 0; i < members.length; i++) {

                                                try {

                                                    await members[i].send(msg) // Send Message;

                                                    await timeIIa(timeS);


                                                } catch {

                                                }

                                            }

                                            setInterval(() => {

                                                let edddd = new Discord.MessageEmbed()
                                                    .setTitle("**بــرودكــاسـت**")
                                                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                    .setColor(message.member.roles.highest.hexColor)
                                                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                    .setDescription(`:white_check_mark: **| ارسال... | الى جميع اعضاء: ${message.guild.members.cache.filter(m => m.presence.status === "dnd" || m.presence.status === "idle" || m.presence.status === "online" && !m.user.bot).size}**`)
                                                    .setFooter("by alistar200")

                                                mSure.edit(edddd);

                                            }, 1 * 10000);

                                        } else if (reason === "Done2") {

                                            //Cancel

                                            let cancelEmbed = new Discord.MessageEmbed()
                                                .setTitle("**بــرودكــاسـت**")
                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                .setColor(message.member.roles.highest.hexColor)
                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                .setDescription(":x:** | تم الغاء.**")
                                                .setFooter("**بــرودكــاسـت**")

                                            mSure.edit(cancelEmbed);
                                            mSure.reactions.removeAll();

                                        } else if (!reason.startsWith("Done1") && !reason.startsWith("Done2")) {

                                            let timeoutEmbed = new Discord.MessageEmbed()
                                                .setTitle("**بــرودكــاسـت**")
                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                .setColor(message.member.roles.highest.hexColor)
                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                .setDescription(":x:** | انتهى وقت .**")
                                                .setFooter("by alistar200")


                                            mSure.reactions.removeAll();
                                            mSure.edit(timeoutEmbed);

                                        }



                                    })


                                })

                            });

                            MsgCollector.on("end", async (ccol, reason) => {


                            });

                        })

                    } else if (reason === "Done2") {

                        //All

                        let msgEmbed = new Discord.MessageEmbed()

                            .setTitle("**بــرودكــاسـت**")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setColor(message.member.roles.highest.hexColor)
                            .setThumbnail(message.guild.iconURL({ dynamic: true }))
                            .setDescription(":white_check_mark:** | اكتب رسالة.**")
                            .setFooter("by alistar200")

                        m.edit(msgEmbed).then(() => {

                            let MsgFilter = m => m.author.id === message.author.id;
                            let MsgCollector = m.channel.createMessageCollector(MsgFilter, { time: 60000, max: 1 });

                            MsgCollector.on("collect", msg => {

                                let SureEmbed = new Discord.MessageEmbed()

                                    .setTitle("هل تريد ارسال رسالة ?")
                                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                    .setColor(message.member.roles.highest.hexColor)
                                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                    .setDescription(msg.content)
                                    .setFooter("by alistar200")

                                msg.delete({ timeout: 500 });
                                m.delete({ timeout: 500 });

                                msg.channel.send(SureEmbed).then(async (mSure) => {

                                    await mSure.react("✅");
                                    await mSure.react("❌");

                                    let ReactionFilter = (r, user) => {

                                        return user.id === message.author.id && ["✅", "❌"].includes(r.emoji.name);

                                    }
                                    let ReactionCollector = mSure.createReactionCollector(ReactionFilter, { time: 15000 });

                                    ReactionCollector.on("collect", r => {

                                        if (r.emoji.name === "✅") {


                                            mSure.reactions.removeAll();
                                            ReactionCollector.stop("Done1" + msg.content);

                                        } else if (r.emoji.name === "❌") {

                                            mSure.reactions.removeAll();

                                            ReactionCollector.stop("Done2");

                                        }

                                    })

                                    ReactionCollector.on("end", async (col, reason) => {


                                        if (reason.startsWith("Done1")) {

                                            let msg = reason.replace("Done1", "");

                                            //Send

                                            let sendEmbed = new Discord.MessageEmbed()
                                                .setTitle("**بــرودكــاسـت**")
                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                .setColor(message.member.roles.highest.hexColor)
                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                .setDescription(`:white_check_mark: **| ارسال... | الى جميع اعضاء: ${message.guild.members.cache.filter(m => !m.user.bot).size}**`)
                                                .setFooter("by alistar200")

                                            mSure.edit(sendEmbed);

                                            let members = message.guild.members.cache.filter(m => !m.user.bot).array();

                                            for (var i = 0; i < members.length; i++) {

                                                try {

                                                    await members[i].send(msg) // Send Message;

                                                    await timeIIa(timeS);


                                                } catch {

                                                }

                                            }



                                            setInterval(() => {

                                                let edddd = new Discord.MessageEmbed()
                                                    .setTitle("**بــرودكــاسـت**")
                                                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                    .setColor(message.member.roles.highest.hexColor)
                                                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                    .setDescription(`:white_check_mark: **| ارسال... | الى جميع اعضاء: ${message.guild.memberCount}**`)
                                                    .setFooter("by alistar200")

                                                mSure.edit(edddd);

                                            }, 1 * 10000);

                                        } else if (reason === "Done2") {

                                            //Cancel

                                            let cancelEmbed = new Discord.MessageEmbed()
                                                .setTitle("**بــرودكــاسـت**")
                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                .setColor(message.member.roles.highest.hexColor)
                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                .setDescription(":x:** | الغاء.**")
                                                .setFooter("by alistar200")

                                            mSure.reactions.removeAll();
                                            mSure.edit(cancelEmbed);


                                        } else if (!reason.startsWith("Done1") && !reason.startsWith("Done2")) {

                                            let timeoutEmbed = new Discord.MessageEmbed()
                                                .setTitle("**بــرودكــاسـت**")
                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                .setColor(message.member.roles.highest.hexColor)
                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                .setDescription(":x:** | انتهى وقت.**")
                                                .setFooter("by alistar200")

                                            mSure.reactions.removeAll();
                                            mSure.edit(timeoutEmbed);

                                        }



                                    })


                                })

                            });

                            MsgCollector.on("end", reason => {


                            });
                        })

                    } else if (reason === "Done3") {

                        //Role

                        message.channel.send("🟠 **| منشن رتبة: **").then((rmm) => {

                            let MsgFilter = m => m.author.id === message.author.id;
                            let MsgCollector = rmm.channel.createMessageCollector(MsgFilter, { time: 60000, max: 1 });

                            MsgCollector.on("collect", msg => {

                                let role = msg.mentions.roles.first();

                                if (role) {

                                    rmm.delete({ timeout: 150 });
                                    msg.delete({ timeout: 150 })
                                    let msgEmbed = new Discord.MessageEmbed()

                                        .setTitle("**بــرودكــاسـت**")
                                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                        .setColor(message.member.roles.highest.hexColor)
                                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                        .setDescription(":white_check_mark:** | اكتب رسالة.**")
                                        .setFooter("by alistar200")

                                    m.edit(msgEmbed).then(() => {

                                        let MsgFilter = m => m.author.id === message.author.id;
                                        let MsgCollector = m.channel.createMessageCollector(MsgFilter, { time: 60000, max: 1 });

                                        MsgCollector.on("collect", msg => {

                                            let SureEmbed = new Discord.MessageEmbed()

                                                .setTitle("هل تريد ارسال رسالة ?")
                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                .setColor(message.member.roles.highest.hexColor)
                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                .setDescription(msg.content)
                                                .setFooter("by alistar200")

                                            msg.delete({ timeout: 500 });
                                            m.delete({ timeout: 500 });

                                            msg.channel.send(SureEmbed).then(async (mSure) => {

                                                await mSure.react("✅");
                                                await mSure.react("❌");

                                                let ReactionFilter = (r, user) => {

                                                    return user.id === message.author.id && ["✅", "❌"].includes(r.emoji.name);

                                                }
                                                let ReactionCollector = mSure.createReactionCollector(ReactionFilter, { time: 15000 });

                                                ReactionCollector.on("collect", r => {

                                                    if (r.emoji.name === "✅") {


                                                        mSure.reactions.removeAll();
                                                        ReactionCollector.stop("Done1" + msg.content);

                                                    } else if (r.emoji.name === "❌") {

                                                        mSure.reactions.removeAll();

                                                        ReactionCollector.stop("Done2");

                                                    }

                                                })

                                                ReactionCollector.on("end", async (col, reason) => {

                                                    if (reason.startsWith("Done1")) {

                                                        let msg = reason.replace("Done1", "");

                                                        //Send


                                                        let sendEmbed = new Discord.MessageEmbed()
                                                            .setTitle("**بــرودكــاسـت**")
                                                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                            .setColor(message.member.roles.highest.hexColor)
                                                            .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                            .setDescription(`:white_check_mark: **| ارسال... | الى جميع اعضاء : ${message.guild.members.cache.filter(m => m.roles.cache.find(r => r.id === role.id) && !m.user.bot).size}**`)
                                                            .setFooter("by Alistar200")

                                                        mSure.edit(sendEmbed);

                                                        let members = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.id === role.id) && !m.user.bot).array();


                                                        for (var i = 0; i < members.length; i++) {

                                                            try {

                                                                await members[i].send(msg) // Send Message;

                                                                await timeIIa(timeS);


                                                            } catch {

                                                            }

                                                        }

                                                        setInterval(() => {

                                                            let edddd = new Discord.MessageEmbed()
                                                                .setTitle("**بــرودكــاسـت**")
                                                                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                                .setColor(message.member.roles.highest.hexColor)
                                                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                                .setDescription(`:white_check_mark: **| ارسال... |الى جميع اعضاء: ${message.guild.members.cache.filter(m => m.roles.cache.find(r => r.id === role.id) && !m.user.bot).size}**`)
                                                                .setFooter("by alistar200")

                                                            mSure.edit(edddd);

                                                        }, 1 * 10000);

                                                    } else if (reason === "Done2") {

                                                        //Cancel

                                                        let cancelEmbed = new Discord.MessageEmbed()
                                                            .setTitle("**بــرودكــاسـت**")
                                                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                            .setColor(message.member.roles.highest.hexColor)
                                                            .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                            .setDescription(":x:** | تم الغاء.**")
                                                            .setFooter("by alistar200")

                                                        mSure.reactions.removeAll();
                                                        mSure.edit(cancelEmbed);

                                                    } else if (!reason.startsWith("Done1") && !reason.startsWith("Done2")) {

                                                        let timeoutEmbed = new Discord.MessageEmbed()
                                                            .setTitle("**بــرودكــاسـت**")
                                                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                                                            .setColor(message.member.roles.highest.hexColor)
                                                            .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                                            .setDescription(":x:** | انتهى وقت .**")
                                                            .setFooter("by alistar200")

                                                        mSure.reactions.removeAll();
                                                        mSure.edit(timeoutEmbed);

                                                    }



                                                })


                                            })

                                        });

                                        MsgCollector.on("end", reason => {


                                        });
                                    })

                                } else {

                                    MsgCollector.stop();
                                    rmm.edit(":x: ** | اجابة سيئة.**")
                                }

                            });

                        })


                    } else if (reason != "Done1" && reason != "Done2" && reason != "Done3") {

                        let timeoutEmbed = new Discord.MessageEmbed()

                            .setTitle("**بــرودكــاسـت**")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setColor(message.member.roles.highest.hexColor)
                            .setThumbnail(message.guild.iconURL({ dynamic: true }))
                            .setDescription(":x:** | انتهى وقت **")
                            .setFooter("by alistar200")

                        m.reactions.removeAll();
                        m.edit(timeoutEmbed);

                    }

                })

            })

        }

    }

});

client.login(process.env.token);
