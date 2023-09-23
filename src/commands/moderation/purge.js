const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Remove all messages from channel');

async function execute(interaction) {
  // Check if the user has permission to manage messages
  if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
    try {
      // Fetch all messages in the current channel
      const fetchedMessages = await interaction.channel.messages.fetch();

      // Delete all fetched messages
      await interaction.channel.bulkDelete(fetchedMessages, true);

      await interaction.reply('Cleared the entire channel.');
    } catch (error) {
      console.error(`Error clearing the channel: ${error}`);
      await interaction.reply('An error occurred while clearing the channel.');
    }
  } else {
    await interaction.reply('You do not have permission to use this command.');
  }
}

module.exports = {
  data,
  execute,
};