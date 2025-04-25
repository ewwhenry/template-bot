import { SearchResult, Track } from "lavalink-client";

export default {
  metadata: {
    translator: "ewwhenry <ewwhenry@proton.me>",
  },
  commands: {
    avatar: {
      name: "avatar",
      description: "Get the avatar of a user",
    },
  },
  embeds: {
    player: {
      NOW_PLAYING: ({
        artist,
        duration,
        requester,
        thumbnail,
        title,
      }: {
        title: string;
        artist: string;
        duration: string;
        requester: string;
        thumbnail?: string;
      }) => ({
        description: `## **${title}**\n-# by **${artist}**`,
        fields: [
          {
            name: "Duration",
            value: duration,
            inline: true,
          },
          {
            name: "Requested by",
            value: requester,
            inline: true,
          },
        ],
        thumbnail: {
          url: thumbnail || "",
        },
        color: 0x2e3233,
      }),
    },
  },
  messages: {
    player: {
      NO_PLAYER_IN_GUILD: "There is no player active in this server.",
      NO_TRACKS_FOUND: "No tracks were found.",
      PLAYING: "Now Playing",
      PAUSED: "Paused",
      STOPPED: "Stopped",
      REQUESTED_BY: ({ username, id }: { id: string; username?: string }) =>
        `Requested by ${id ? `<@${id}>` : username || "someone"}`,
      NOW_PLAYING: (data: Track) =>
        `**Now Playing:**\n[\`${data.info.title}\`](${data.info.uri}) by \`${
          data.info.author
        }\`, requested by <@${(data.requester as { id: string }).id}>`,
      QUEUE_EMPTY: "The queue is currently empty.",
      QUEUE_END: "The queue has ended.",
      QUEUE_SHUFFLED: "The queue has been shuffled.",
      QUEUE_CLEARED: "The queue has been cleared.",
      QUEUE_ADDED: "Track added to the queue.",
      QUEUE_REMOVED: "Track removed from the queue.",
      SKIPPED: "Skipped to the next track.",
      SKIPPED_TO: ({ position }: { position: number }) =>
        `Skipped to position ${position}.`,
      SKIP_QUEUE_EMPTY:
        "Not enough tracks in the queue to skip. Use `/play` to add more songs.",
      QUEUE_BULK_ADDED: ({
        tracks,
        position,
      }: {
        tracks: Track[];
        position: number;
      }) =>
        `✅ | ${tracks.length} tracks added to the queue at position ${position}`,
      QUEUE_SINGLE_ADDED: ({
        track,
        position,
      }: {
        track: Track;
        position: number;
      }) =>
        `✅ | \`${track.info.title}\` by \`${track.info.author}\` added to the queue at position ${position}`,
    },
    voice: {
      JOIN_CHANNEL: "Please join a voice channel first!",
      NOT_ABLE_TO_CONNECT_OR_SPEAK:
        "I don't have permission to join or speak in the voice channel.",
      NOT_IN_CHANNEL: "You are not in a voice channel.",
      NOT_SAME_CHANNEL:
        "You're not in the same voice channel as me. Please join my channel and try again.",
    },
  },
};
