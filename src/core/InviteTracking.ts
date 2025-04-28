import axios from "axios";
import Bot from "./Bot";
import { GuildMember, UsingClient } from "seyfert";
import { CLIENT } from "../config";
import { GatewayInviteCreateDispatchData } from "seyfert/lib/types";

async function fetchGuildInvites(guildId: string) {
  try {
    const response = await axios.get(
      `https://discord.com/api/v10/guilds/${guildId}/invites`,
      {
        headers: {
          Authorization: `Bot ${CLIENT.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching guild invites:", error);
    return null;
  }
}

export async function onInviteCreate(
  client: Bot,
  invite: GatewayInviteCreateDispatchData
) {
  // Fetch the guild invites from the Discord API
  const invites = await fetchGuildInvites(invite.guild_id!);
}

export async function onGuildMemberAdd(
  client: Bot | UsingClient,
  member: GuildMember
) {
  const invites = await fetchGuildInvites(member.guildId);
  if (!invites) return;
  client.logger.debug("Fetched invites:", invites);
}
