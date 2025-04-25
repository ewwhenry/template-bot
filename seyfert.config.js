import { config } from "seyfert";
import { CLIENT } from "./src/config";

export default config.bot({
  token: CLIENT.token,
  locations: {
    base: "src",
    commands: "commands",
    events: "events/discord",
    langs: "langs",
  },
  intents: ["Guilds", "GuildMembers", "GuildInvites", "GuildVoiceStates"],
});
