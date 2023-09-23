const translate = require('@iamtraction/google-translate');
const { SlashCommandBuilder } = require('discord.js');


const data = new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translate text to a language of your choice!')
    .addStringOption(option =>
    option.setName('text')
      .setDescription('The text you want translated')
      .setRequired(true))
    .addStringOption(option => 
    option.setName('language')
      .setDescription('The language you want to translate to, using a 2 character code')
      .setRequired(true))

const langCodes = [
    { name: 'Amharic', code: 'am' },
    { name: 'Arabic', code: 'ar' },
    { name: 'Basque', code: 'eu' },
    { name: 'Bengali', code: 'bn' },
    { name: 'English (UK)', code: 'en-GB' },
    { name: 'Portuguese (Brazil)', code: 'pt-BR' },
    { name: 'Bulgarian', code: 'bg' },
    { name: 'Catalan', code: 'ca' },
    { name: 'Cherokee', code: 'chr' },
    { name: 'Croatian', code: 'hr' },
    { name: 'Czech', code: 'cs' },
    { name: 'Danish', code: 'da' },
    { name: 'Dutch', code: 'nl' },
    { name: 'English (US)', code: 'en' },
    { name: 'Estonian', code: 'et' },
    { name: 'Filipino', code: 'fil' },
    { name: 'Finnish', code: 'fi' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Greek', code: 'el' },
    { name: 'Gujarati', code: 'gu' },
    { name: 'Hebrew', code: 'iw' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Hungarian', code: 'hu' },
    { name: 'Icelandic', code: 'is' },
    { name: 'Indonesian', code: 'id' },
    { name: 'Italian', code: 'it' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Kannada', code: 'kn' },
    { name: 'Korean', code: 'ko' },
    { name: 'Latvian', code: 'lv' },
    { name: 'Lithuanian', code: 'lt' },
    { name: 'Malay', code: 'ms' },
    { name: 'Malayalam', code: 'ml' },
    { name: 'Marathi', code: 'mr' },
    { name: 'Norwegian', code: 'no' },
    { name: 'Polish', code: 'pl' },
    { name: 'Portuguese (Portugal)', code: 'pt-PT' },
    { name: 'Romanian', code: 'ro' },
    { name: 'Russian', code: 'ru' },
    { name: 'Serbian', code: 'sr' },
    { name: 'Chinese (PRC)', code: 'zh-CN' },
    { name: 'Slovak', code: 'sk' },
    { name: 'Slovenian', code: 'sl' },
    { name: 'Spanish', code: 'es' },
    { name: 'Swahili', code: 'sw' },
    { name: 'Swedish', code: 'sv' },
    { name: 'Tamil', code: 'ta' },
    { name: 'Telugu', code: 'te' },
    { name: 'Thai', code: 'th' },
    { name: 'Chinese (Taiwan)', code: 'zh-TW' },
    { name: 'Turkish', code: 'tr' },
    { name: 'Urdu', code: 'ur' },
    { name: 'Ukrainian', code: 'uk' },
    { name: 'Vietnamese', code: 'vi' },
    { name: 'Welsh', code: 'cy' }
  ];


async function execute(interaction){
    const phrase = interaction.options.getString('text');
    const translationLang = interaction.options.getString('language').toLowerCase();
    let isValid = false;

    for (const language of langCodes){
        if(language.code === translationLang){
            isValid = true;
            break;
        }
    }

    if(translationLang.length > 2 || /^[a-z]{2}$/.test(translationLang==false || !isValid)){
        await interaction.reply('Translation code invalid please try again');
    }

    const translation = await translate(phrase, { to: translationLang });
    if(translation.text && translation.text.trim() !== ''){
        await interaction.reply(translation.text)
    } else{
        await interaction.reply('Unable to perform translation :(');
    }

}

module.exports = {
    data,
    execute
}
