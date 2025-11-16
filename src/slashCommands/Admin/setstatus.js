const { SlashCommandBuilder, PermissionFlagsBits, ActivityType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setstatus')
    .setDescription('Sets the bot status message!')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Select the status type')
        .setRequired(true)
        .addChoices(
          { name: 'PLAYING', value: 'PLAYING' },
          { name: 'WATCHING', value: 'WATCHING' },
          { name: 'LISTENING', value: 'LISTENING' },
          { name: 'STREAMING', value: 'STREAMING' },
        ))
    .addStringOption(option =>
      option
        .setName('text')
        .setDescription('Enter the status text')
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  /**
   * @param {import('discord.js').CommandInteraction} interaction
   * @param {import('discord.js').Client} client
   */
  async execute(interaction, client) {
    const type = interaction.options.getString('type');
    const text = interaction.options.getString('text');

    let activityType;

    switch (type) {
      case 'PLAYING':
        activityType = ActivityType.Playing;
        break;
      case 'WATCHING':
        activityType = ActivityType.Watching;
        break;
      case 'LISTENING':
        activityType = ActivityType.Listening;
        break;
      case 'STREAMING':
        activityType = ActivityType.Streaming;
        break;
      default:
        activityType = ActivityType.Playing;
        break;
    }

    try {
      await client.user.setActivity(text, { type: activityType });

      await interaction.reply({
        content: `✅ | Bot status has been updated to: **${type} ${text}**`,
        ephemeral: true,
      });

      if (typeof client.modLog === 'function') {
        await client.modLog(
          interaction,
          `Bot status updated to: **${type} ${text}** by ${interaction.user}.`,
        );
      }
    } catch (error) {
      console.error('Error setting bot status:', error);
      await interaction.reply({
        content: '❌ | There was an error updating the bot status.',
        ephemeral: true,
      });
    }
  },
};
