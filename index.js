const { default: Axios } = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token, tenor} = require("./config.json");

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.on("message", message => {
    if(!message.content.startsWith(prefix) || message.author.bot || message.length < 2) return;
    
    const args = message.content.slice(prefix.length).trim();
    const chan = message.channel;
    getGifs(args, chan);
})

const getGifs = (arg, chan) => {
    Axios.get(`https://api.tenor.com/v1/search?q=${arg}&key=${tenor}&limit=8`)
    .then((response) => {
        if(!response.data.results.length){
            chan.send("Too random even for Grando! No gifs found.");
            chan.send("https://tenor.com/zoKz.gif");
        }
        else{
            let index = Math.floor(Math.random() * response.data.results.length);
            chan.send(response.data.results[index].url);
        }
    })
    .catch((err) => {
        console.log("Failed to access Tenor", err)
    })
}