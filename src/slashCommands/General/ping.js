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
      const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });

      const latency = sent.createdTimestamp - interaction.createdTimestamp;
      const apiLatency = Math.round(client.ws.ping);

      interaction.editReply(`Pong! 🏓\nLatency: ${latency}ms\nAPI Latency: ${apiLatency}ms`);
    },
};
