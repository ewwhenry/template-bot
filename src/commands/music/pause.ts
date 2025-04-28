import { Command, CommandContext, Declare } from "seyfert";

@Declare({
  name: "pause",
  description: "Pausa la música.",
})
export default class PauseCommand extends Command {
  override async run(ctx: CommandContext) {
    const { messages } = ctx.client.getLangs(
      (await ctx.guild())?.preferredLocale
    );

    const player = ctx.client.modules.lavalink.players.get(ctx.guildId!);

    if (!player) {
      return ctx.editOrReply({
        content: messages.player.NO_PLAYER_IN_GUILD,
      });
    }

    if (!player.playing) {
      return ctx.editOrReply({
        content: messages.player.PAUSED,
      });
    }

    await player.pause();
    ctx.editOrReply({
      content: messages.player.PAUSED,
    });
  }
}
