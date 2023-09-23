const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.on('messageCreate', (message) => {
			// Ignore messages sent by the bot itself
			if (message.author.bot) return;
		  
			if (message.content === '!hello') {
			  message.reply('Hello, world!');
			}
		  });


		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};