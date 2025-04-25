import {
  AllGuildVoiceChannels,
  GuildMember,
  TextBaseGuildChannel,
} from "seyfert";

export async function permissionsFor(
  channel: TextBaseGuildChannel | AllGuildVoiceChannels,
  member: GuildMember
) {
  return await channel.memberPermissions(member);
}
