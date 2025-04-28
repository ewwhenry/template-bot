import { createEvent } from "seyfert";
import { onGuildMemberAdd } from "../../core/InviteTracking";

export default createEvent({
  data: {
    name: "guildMemberAdd",
    once: false,
  },
  run: async (member, client) => {
    await onGuildMemberAdd(client, member);
  },
});
