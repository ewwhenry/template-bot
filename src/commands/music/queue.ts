import { Command, Declare, CommandContext, Embed } from "seyfert";

@Declare({
  name: "queue",
  description: "Ver la cola de canciones",
})
export default class QueueCommand extends Command {
  override async run(ctx: CommandContext) {
    if (!ctx.guildId) return;
    const { messages } = ctx.client.getLangs(
      (await ctx.guild())?.preferredLocale
    );
    const player = ctx.client.modules.lavalink.getPlayer(ctx.guildId!);

    if (!player)
      return ctx.editOrReply({
        content: "There is no player in this guild.",
        flags: 64,
      });

    const queue = player.queue.tracks.map((track, i) => {
      return `- \`#${i + 1}\` :: [\`${track.info.title}\`](${
        track.info.uri
      }) by \`${track.info.author}\` \n-# requested by <@${
        (track.requester as { id: string }).id
      }>`;
    });
    const current = player.queue.current;

    let text = "";
    if (current) text = messages.player.NOW_PLAYING(current);

    return ctx.editOrReply({
      embeds: [
        new Embed()
          .setTitle("Cola de reproducción")
          .setDescription(
            text +
              "\n" +
              "### Cola\n" +
              (queue.length > 0
                ? queue.join("\n\n")
                : "-# " + messages.player.QUEUE_EMPTY)
          )
          .setThumbnail(
            current && current.info.artworkUrl
              ? current.info.artworkUrl
              : undefined
          )
          .setColor(
            current
              ? current.info.sourceName === "youtube"
                ? 0xff0000
                : current.info.sourceName === "spotify"
                ? 0x1db954
                : 0x00ff00
              : 0xffffff
          ),
      ],
    });
  }
}
