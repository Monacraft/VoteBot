// Welcome to the code, remember to keep a seperate copy for public and dev build
// For any queries, contact Monacraft

const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require('fs');

// Build in ID's
var myID = '400605141092270082';
var devID = '130568487679688704';
var shutdown = false;
var accept = '✅';
var fail = '❌';

var numbers = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
var reactA = '🇦';
var reactB = '🇧';
var reactC = '🇨';
var reactD = '🇩';

var plus = '➕';
var hospital = '🏥';
var ok = '👌';
var dice = '🎲';


client.on('ready', () => {
    client.user.setGame("!help for cmds");
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {
    if (msg.author.id === devID) {
        // This ID is set to Monacraft's ID
        // Dev Commands
        if (msg.content === '!shutdown') {
            if (msg.author.id === devID) {
                shutdown = true;
                msg.reply("Goodbye :')");
            }
        }
    }
    if (msg.content.substring(0, 7) === "!avatar") {
        if (msg.content.substring(7, msg.content.length) === '') {
            if (msg.author.avatarURL === null || msg.author.avatarURL === undefined) {
                msg.reply("You do not have an avatar!");
            }
            else {
                msg.reply(msg.author.avatarURL);
            }
        }
        else {
            var membr = msg.guild.members.find('displayName', msg.content.substring(8, msg.content.length));
            if (membr === null || membr === undefined) {
                msg.reply("They do not have an avatar! (or they may not exist)");
            }
            else {
                msg.reply(membr.user.avatarURL);
            }
        }
    }
    if (msg.content === "!help") {
        msg.author.send(`__**Commands:**__
\`\`\`
!help
!ping
!avatar [?user]                 (user specifies whose avater)
!startvote [topic]              (to start)
!addvote                        (add option)

When adding options or creating vote description, prevent using \` and ;
Bot by monacraft. Avatar command by preetham <3.
\`\`\``);
    }
    if (msg.author.id === myID) {
        if (shutdown) {
            process.exit();
        }
    }
    var notP = true;
    if (msg.content.substring(0, 10) === "!startvote" && notP) {
        msg.delete();
        msg.channel.send(`__**Vote by:**__   ${msg.author}
__**Topic:**__       ${msg.content.substring(11, msg.content.length)}
=========================================================================
`);
    }
    if (msg.content.substring(0, 8) === "!addvote") {
        msg.delete();
        var v = msg.content.substring(9, msg.content.length);
        msg.channel.fetchMessages({ limit: 100 }).then(messages => {
            if (messages.find("author", client.user).content.substring(0, 8) === "__**Vote") {
                var count = messages.find("author", client.user).content.split(';');
                if (count.length - 1 === 0) {
                    messages.find("author", client.user).edit(
                        messages.find("author", client.user).content +
                        '\n   ' + numbers[count.length - 1] + " - `" + v + "`  (by " + msg.author+ ');'
                    );
                } else {
                    messages.find("author", client.user).edit(
                        messages.find("author", client.user).content +
                        '\n   ' + numbers[count.length - 1] + " - `" + v + "`  (by " + msg.author + ');'
                    );
                }
                messages.find("author", client.user).react(numbers[count.length - 1]);
            }
        });
    }
    /*
    msg.channel.fetchMessages({ limit: 100 }).then(messages => {
        if (messages.find("author", client.user).content.substring(0, 4) === "Vote") {
            if(messages.find("author", client.user).content.split('|')[1] !== null)
            if(messages.find("author", client.user).content.split('|')[1] !== null)
            if (messages.find("author", client.user).content.split('|')[1] === 'PERSIST') {
                msg.delete();
            }
        }
    });*/
    if (msg.channel.type === "dm") {
        if (msg.author.id !== myID) {
        }
    }
});

client.on('messageReactionAdd', (react, user) => {
    if (user.id !== myID) {
    }
});

client.login(process.env.BOT_TOKEN);
