const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const data = new SlashCommandBuilder()
    .setName('antonym')
    .setDescription('Provides up to 5 random antonyms for a specified word!')
    .addStringOption(option =>
    option.setName('word')
      .setDescription('The word to get antonyms for')
      .setRequired(true))


function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

async function execute(interaction) {

    const wordForAnt = interaction.options.getString('word');
    if(wordForAnt.split(/\s+/).length > 1){
        await interaction.reply('Please enter one word to get antonyms for at a time.');
    }
    else{
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/thesaurus?word=${wordForAnt}`, {
                headers: {
                'X-Api-Key': process.env.THESAURUS_API_KEY,
                },
            });
            const antonyms = response.data.antonyms
            console.log(antonyms)
            if (antonyms && antonyms.length > 0 && antonyms.length < 5) {
                let output = [`antonyms of ${wordForAnt} include: \n`]
                for (let index = 0; index < antonyms.length; index++) {
                    const antonym = antonyms[index];
                    output.push(`${index + 1}. ${antonym} \n`);
                }
                await interaction.reply(output.join(''));
            }
            else if (antonyms && antonyms.length >=5 ) {
                let output = [`antonyms of ${wordForAnt} include: \n`]
                for (let index = 0; index < 5; index++) {
                    const antonym = antonyms[getRandomInt(0, antonyms.length)];
                    output.push(`${index + 1}. ${antonym} \n`);
                }
                await interaction.reply(output.join(''));
            }
            else {
                await interaction.reply(`No antonyms found for ${wordForAnt}.`);
            }
        } catch (error) {
            await interaction.reply('An error occurred while fetching antonyms.');
        }
    }
}

module.exports = {
    data,
    execute
};