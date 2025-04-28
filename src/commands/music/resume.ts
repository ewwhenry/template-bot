import { Command, CommandContext, Declare } from "seyfert";

@Declare({
  name: "resume",
  description: "Reproduce la música.",
})
export default class ResumeCommand extends Command {
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

    await player.resume();
    ctx.editOrReply({
      content: messages.player.PLAYING,
    });
  }
}
