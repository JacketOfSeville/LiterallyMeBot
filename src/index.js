require('dotenv').config(); // Import TOKEN

const { path, album} = require('./album');
const { library_en, denji } = require('./library');
const { Client, IntentsBitField, Attachment } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} está online.`);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return; 
    function handle (error) { msg.channel.send(error.msg) }
    
    const lowercase = msg.content.toLowerCase();

    let i = 0;
    found = false;
    
    while (i < library_en.length && found == false) {
        if (lowercase.includes(denji[i])) {
            console.log('Detected! -> ' + msg.content);
            reply = `${path}denji.jpg`;
    
            msg.reply({
                files: [
                    {
                        attachment: `${reply}`, name: "denji.jpg"
                    },
                ]
            });
            found = true;
        }
        i++;
    }

    i = 0;
    while (i < library_en.length && found == false) {
        if (lowercase.includes(library_en[i])) {
            console.log('Detected! -> ' + msg.content);
            
            const gen = Math.floor(Math.random() * album.length);
            console.log(gen);
            const image = album[gen];
            
            reply = `${path}${image}`;
    
            msg.reply({
                files: [
                    {
                        attachment: `${reply}`, name: "reply.gif"
                    },
                ]
            });
            found = true;
        }
        i++;
    }

});

client.login(process.env.TOKEN);