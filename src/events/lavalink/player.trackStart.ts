import { Player, Track } from "lavalink-client";
import Bot from "../../core/Bot";
import { formatMS_HHMMSS } from "../../utils/misc";

export default {
  data: {
    name: "trackStart",
  },
  async run(bot: Bot, player: Player, track: Track) {
    const { embeds } = await bot.getGuildLang(player.guildId!);

    const requester = track?.requester as {
      id?: string;
      username?: string;
    };

    bot.logger.info(
      `Track started for player ${player.options.guildId}: ${track?.info.title}`
    );

    bot.messages.write(player.textChannelId!, {
      embeds: [
        embeds.player.NOW_PLAYING({
          title: track!.info.title!,
          artist: track!.info.author!,
          duration: formatMS_HHMMSS(track!.info.duration!),
          requester: requester.id
            ? `<@${requester?.id}>`
            : `${requester.username}`,
          thumbnail: track!.info!.artworkUrl || undefined,
        }),
      ],
    });
  },
};
