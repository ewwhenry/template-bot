import { SubCommand, CommandContext, Declare, Embed } from "seyfert";

@Declare({
  name: "server",
  description: "Muestra información detallada del servidor.",
})
export default class ServerInfoCommand extends SubCommand {
  async run(ctx: CommandContext) {
    const guild = await ctx.guild();

    if (!guild) {
      return ctx.editOrReply({
        content: "Este comando solo se puede usar dentro de un servidor.",
        flags: 64,
      });
    }

    const embed = new Embed()
      .setTitle(`Información del servidor: ${guild.name}`)
      .setThumbnail(guild.iconURL({ size: 1024 }) || "")
      .addFields(
        { name: "🆔 ID", value: guild.id, inline: true },
        { name: "👑 Propietario", value: `<@${guild.ownerId}>`, inline: true },
        {
          name: "📅 Creado el",
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
          inline: false,
        },
        {
          name: "👥 Miembros",
          value: `${guild.memberCount!.toLocaleString()}`,
          inline: true,
        },
        {
          name: "💬 Canales",
          value: `${guild.channels.list.length}`,
          inline: true,
        }
      )
      .setColor(0x5865f2)
      .setFooter({
        text: `Solicitado por ${ctx.author.username}`,
        iconUrl: ctx.author.avatarURL(),
      })
      .setTimestamp();

    await ctx.editOrReply({ embeds: [embed] });
  }
}
