const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const data = new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Displays a random inspirational quote');


async function execute(interaction) {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
            headers: {
                'X-Api-Key': process.env.THESAURUS_API_KEY
            },
        });

        const quoteData = response.data[0];

        if (quoteData && quoteData.quote && quoteData.author) {
            await interaction.reply(`${quoteData.quote} Written by ${quoteData.author}`);
        } else {
            await interaction.reply('Unable to retrieve a valid quote at the moment.');
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while fetching your quote :(');
    }
}

module.exports = {
    data,
    execute
}