import {
  Command,
  Declare,
  CommandContext,
  createNumberOption,
  Options,
} from "seyfert";

const options = {
  hasta: createNumberOption({
    description: "Posición de la canción hasta la cual saltar",
    required: false,
  }),
};

@Declare({
  name: "skip",
  description: "Saltar canciones en la cola",
})
@Options(options)
export default class SkipCommand extends Command {
  async run(ctx: CommandContext<typeof options>) {
    const { messages } = ctx.client.getLangs(
      (await ctx.guild())?.preferredLocale
    );

    const player = ctx.client.modules.lavalink.players.get(ctx.guildId!);

    if (!player) {
      return ctx.editOrReply({
        content: messages.player.NO_PLAYER_IN_GUILD,
      });
    }

    const { hasta: index = 0 } = ctx.options;

    if (player.queue.tracks.length < index) {
      return ctx.editOrReply({
        content: messages.player.SKIP_QUEUE_EMPTY,
      });
    }

    await player.skip(index);
    ctx.editOrReply({
      content:
        index > 0
          ? messages.player.SKIPPED_TO({ position: index })
          : messages.player.SKIPPED,
    });
  }
}
