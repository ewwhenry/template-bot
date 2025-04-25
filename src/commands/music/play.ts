import {
  Command,
  CommandContext,
  Options,
  Declare,
  createStringOption,
} from "seyfert";

import { SearchPlatform, SearchResult, Track } from "lavalink-client";
import { permissionsFor } from "../../utils/perms";
import { getVoiceChannel } from "../../utils/voice";
import { formatMS_HHMMSS } from "../../utils/misc";
import { MessageFlags } from "seyfert/lib/types";

const autocompleteMap = new Map();

const options = {
  fuente: createStringOption({
    description: "De donde quieres reproducir la música",
    required: true,
    choices: [
      {
        name: "Spotify",
        value: "spsearch",
      },
      {
        name: "Youtube",
        value: "ytsearch",
      },
    ],
  }),
  query: createStringOption({
    description: "La canción que quieres reproducir",
    required: true,
    autocomplete: async (ctx) => {
      if (!ctx.guildId) return;
      const { messages } = ctx.client.getLangs(ctx.guildLocale);
      const voicechannel = await getVoiceChannel(ctx.member!);
      const clientMember = await (
        await ctx.fetchGuild()
      )?.members.fetch(ctx.client.botId)!;

      if (!voicechannel) {
        await ctx.respond([
          {
            name: messages.voice.JOIN_CHANNEL,
            value: "voice.JOIN_CHANNEL",
          },
        ]);

        return;
      }

      const botPermissions = await permissionsFor(voicechannel, clientMember);
      if (!botPermissions.has("Connect") || !botPermissions.has("Speak")) {
        await ctx.respond([
          {
            name: messages.voice.NOT_ABLE_TO_CONNECT_OR_SPEAK,
            value: "messages.voice.NOT_ABLE_TO_CONNECT_OR_SPEAK",
          },
        ]);
      }

      const input = ctx.getInput();

      if (input.length < 5) {
        await ctx.respond([
          {
            name: messages.player.NO_TRACKS_FOUND,
            value: "messages.player.NO_TRACKS_FOUND",
          },
        ]);
        return;
      }

      const player =
        ctx.client.modules.lavalink.getPlayer(ctx.guildId) ||
        ctx.client.modules.lavalink.createPlayer({
          guildId: ctx.guildId,
          voiceChannelId: voicechannel.id,
          textChannelId: ctx.channel.id,
          selfDeaf: true,
          selfMute: false,
          volume: ctx.client.default_volume,
          instaUpdateFiltersFix: true,
        });

      if (!player.connected) {
        await player.connect();
      }

      if (player.voiceChannelId !== voicechannel.id) {
        await ctx.respond([
          {
            name: messages.voice.NOT_SAME_CHANNEL,
            value: "messages.voice.NOT_SAME_CHANNEL",
          },
        ]);

        return;
      }

      const res = (await player.search(
        {
          query: input,
          source: ctx.options.getString("fuente") as SearchPlatform,
        },
        {
          id: ctx.user.id,
          username: ctx.user.username,
          avatar: ctx.user.avatarURL(),
        }
      )) as SearchResult;

      if (!res.tracks.length)
        return await ctx.respond([
          {
            name: messages.player.NO_TRACKS_FOUND,
            value: "messages.player.NO_TRACKS_FOUND",
          },
        ]);
      if (autocompleteMap.has(`${ctx.user.id}_timeout`))
        clearTimeout(autocompleteMap.get(`${ctx.user.id}_timeout`));
      autocompleteMap.set(`${ctx.user.id}_res`, res);
      autocompleteMap.set(
        `${ctx.user.id}_timeout`,
        setTimeout(() => {
          autocompleteMap.delete(`${ctx.user.id}_res`);
          autocompleteMap.delete(`${ctx.user.id}_timeout`);
        }, 25000)
      );

      await ctx.respond(
        res.loadType === "playlist"
          ? [
              {
                name: `Playlist [${res.tracks.length} Tracks] - ${res.playlist?.title}`,
                value: `autocomplete_0`,
              },
            ]
          : res.tracks
              .map((t: Track, i) => ({
                name: `[${formatMS_HHMMSS(t.info.duration)}] ${
                  t.info.title
                } (by ${t.info.author || "Unknown-Author"})`.substring(0, 100),
                value: `autocomplete_${i}`,
              }))
              .slice(0, 25)
      );
    },
  }),
};

@Declare({
  name: "play",
  description: "Reproduce una canción",
})
@Options(options)
export default class PlayCommand extends Command {
  async run(ctx: CommandContext<typeof options>) {
    const { messages } = ctx.client.getLangs(
      (await ctx.guild())?.preferredLocale
    );

    const voicechannel = await getVoiceChannel(ctx.member!);
    const clientMember = await (
      await ctx.guild()
    )?.members.fetch(ctx.client.botId)!;
    if (!voicechannel)
      return ctx.editOrReply({
        content: messages.voice.JOIN_CHANNEL,
        flags: MessageFlags.Ephemeral,
      });

    await ctx.deferReply();

    const permissions = await permissionsFor(voicechannel, clientMember);
    if (!permissions.has("Connect") || !permissions.has("Speak"))
      return ctx.editOrReply({
        content: messages.voice.NOT_ABLE_TO_CONNECT_OR_SPEAK,
        flags: MessageFlags.Ephemeral,
      });

    const platform = ctx.options.fuente;
    const query = ctx.options.query;

    if (query === "messages.player.NO_TRACKS_FOUND")
      return ctx.editOrReply({ content: messages.player.NO_TRACKS_FOUND });

    const fromAutoComplete =
      Number(query.replace("autocomplete_", "")) >= 0 &&
      autocompleteMap.has(`${ctx.author.id}_res`) &&
      autocompleteMap.get(`${ctx.author.id}_res`);

    if (autocompleteMap.has(`${ctx.author.id}_res`)) {
      if (autocompleteMap.has(`${ctx.author.id}_timeout`))
        clearTimeout(autocompleteMap.get(`${ctx.author.id}_timeout`));
      autocompleteMap.delete(`${ctx.author.id}_res`);
      autocompleteMap.delete(`${ctx.author.id}_timeout`);
    }

    const player =
      ctx.client.modules.lavalink.getPlayer(ctx.guildId!) ||
      ctx.client.modules.lavalink.createPlayer({
        guildId: ctx.guildId!,
        voiceChannelId: voicechannel.id,
        textChannelId: ctx.channelId,
        selfDeaf: true,
        selfMute: false,
        volume: ctx.client.default_volume,
        instaUpdateFiltersFix: true,
        applyVolumeAsFilter: false,
      });

    const connected = player.connected;

    if (!connected) {
      await player.connect();
    }

    if (player.voiceChannelId !== voicechannel.id)
      return ctx.editOrReply({
        content: messages.voice.NOT_SAME_CHANNEL,
        flags: MessageFlags.Ephemeral,
      });

    const response = (fromAutoComplete ||
      (await player.search(
        { query: query, source: platform as SearchPlatform },
        {
          id: ctx.author.id,
          username: ctx.author.username,
          avatar: ctx.author.avatarURL(),
        }
      ))) as SearchResult;

    if (!response || !response.tracks?.length)
      return ctx.editOrReply({ content: messages.player.NO_TRACKS_FOUND });

    let singleTrack =
      response.loadType === "playlist"
        ? false
        : response.tracks[
            fromAutoComplete ? Number(query.replace("autocomplete_", "")) : 0
          ];

    await player.queue.add(
      response.loadType === "playlist"
        ? response.tracks
        : response.tracks[
            fromAutoComplete ? Number(query.replace("autocomplete_", "")) : 0
          ]
    );

    await ctx.editOrReply({
      content:
        response.loadType === "playlist" && singleTrack === false
          ? messages.player.QUEUE_BULK_ADDED({
              tracks: response.tracks,
              position: player.queue.tracks.length,
            })
          : messages.player.QUEUE_SINGLE_ADDED({
              track: singleTrack as Track,
              position: player.queue.tracks.length,
            }),
    });

    if (!player.playing) {
      await player.play(
        connected
          ? { volume: ctx.client.default_volume, paused: false }
          : undefined
      );
    }
  }
}
