import Bot from "../core/Bot";
import { InteractionGuildMember } from "seyfert";

export function getShardId(guildId: string, totalShards: number) {
  return (BigInt(guildId) >> 22n) % BigInt(totalShards);
}

export function sendToShard(client: Bot) {
  return (guildId: string, payload: any) => {
    let shardId = getShardId(guildId ?? "", client.gateway.size);
    client.gateway.get(Number(shardId))?.send(true, payload);
  };
}

export async function getVoiceChannel(member: InteractionGuildMember) {
  try {
    let memberVoiceState = await member.voice();
    if (!memberVoiceState) return undefined;
    let memberVoiceChannel = memberVoiceState.channel();

    return memberVoiceChannel;
  } catch (err) {
    return undefined;
  }
}
