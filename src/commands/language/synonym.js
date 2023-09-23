const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const data = new SlashCommandBuilder()
    .setName('synonym')
    .setDescription('Provides up to 5 random synonyms for a specified word!')
    .addStringOption(option =>
    option.setName('word')
      .setDescription('The word to get synonyms for')
      .setRequired(true))


function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

async function execute(interaction) {

    const wordForAnt = interaction.options.getString('word');
    if(wordForAnt.split(/\s+/).length > 1){
        await interaction.reply('Please enter one word to get synonyms for at a time.');
    }
    else{
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/thesaurus?word=${wordForAnt}`, {
                headers: {
                'X-Api-Key': process.env.THESAURUS_API_KEY,
                },
            });
            const synonyms = response.data.synonyms
            console.log(synonyms)
            if (synonyms && synonyms.length > 0 && synonyms.length < 5) {
                let output = [`synonyms of ${wordForAnt} include: \n`]
                for (let index = 0; index < synonyms.length; index++) {
                    const synonym = synonyms[index];
                    output.push(`${index + 1}. ${synonym} \n`);
                }
                await interaction.reply(output.join(''));
            }
            else if (synonyms && synonyms.length >=5 ) {
                let output = [`synonyms of ${wordForAnt} include: \n`]
                for (let index = 0; index < 5; index++) {
                    const synonym = synonyms[getRandomInt(0, synonyms.length)];
                    output.push(`${index + 1}. ${synonym} \n`);
                }
                await interaction.reply(output.join(''));
            }
            else {
                await interaction.reply(`No synonyms found for ${wordForAnt}.`);
            }
        } catch (error) {
            await interaction.reply('An error occurred while fetching synonyms.');
        }
    }
}

module.exports = {
    data,
    execute
};

