const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

    /**
     * 
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async (client, interaction) => {
      try {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });

        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);

        await interaction.editReply({
          content: `Pong! 🏓\nLatency: ${latency}ms\nAPI Latency: ${apiLatency}ms`
        });
      } catch (error) {
        console.error('Error executing ping command:', error);
        if (!interaction.replied || interaction.deferred) {
          await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
        }
      }
    }
};