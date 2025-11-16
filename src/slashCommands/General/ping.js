const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),

  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * @param {import('discord.js').Client} client
   */
  async execute(interaction, client) {
    try {
      await interaction.reply({
        content: "Pong 🏓",
        flags: 64, // equivalente a ephemeral: true na v14
      });

      if (typeof client.modLog === "function") {
        await client.modLog(
          interaction,
          `Command executed by ${interaction.user}\nReason: No reason at all, it's just ping to show you how mod logs will work.`,
        );
      }
    } catch (error) {
      console.error("Erro no comando /ping:", error);

      // se ainda não respondeu, tenta mandar um erro pro usuário
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "❌ Ocorreu um erro ao executar este comando.",
          flags: 64,
        });
      }
    }
  },
};

/**
 * This template is made by autodevsigma
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 */