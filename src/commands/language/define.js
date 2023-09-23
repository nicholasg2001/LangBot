const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

// Define the command
const data = new SlashCommandBuilder()
  .setName('define')
  .setDescription('Define a word')
  .addStringOption(option =>
    option.setName('word')
      .setDescription('The word to define')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('context')
      .setDescription('Enter a part of speech, ex: noun')
      .setRequired(true))

//Define the acceptable inputs for context
const partsOfSpeech =["noun", "adjective", "pronoun", "adverb", "preposition", "conjunction", "interjection", "verb"]

// Define the function to handle the command
async function execute(interaction) {

    const wordToDefine = interaction.options.getString('word');
    const context = interaction.options.getString('context').toLowerCase();

    if(wordToDefine.split(/\s+/).length > 1){
        await interaction.reply('Please enter one word to define at a time.');
    }
    else if(partsOfSpeech.includes(context) == false){
        await interaction.reply('Please enter a valid part of speech');
    }
    else{
        try {
            const response = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${wordToDefine}/definitions`, {
                headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                },
            });
            const definitions = response.data.definitions.filter(definition => definition.partOfSpeech === `${context}`);
            if (definitions && definitions.length > 0) {
                let output = [`Relevant ${context} definitions of ${wordToDefine} include: \n`]
                for (let index = 0; index < definitions.length; index++) {
                    const definition = definitions[index];
                    output.push(`${index + 1}. ${definition.definition} \n`);
                }
                await interaction.reply(output.join(''));
            }
            else {
                await interaction.reply(`No definitions found for ${wordToDefine} within the context of ${context}.`);
            }
        } catch (error) {
            await interaction.reply('An error occurred while fetching the definition.');
        }
    }
}

module.exports = {
    data,
    execute
};