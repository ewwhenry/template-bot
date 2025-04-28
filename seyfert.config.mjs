process.loadEnvFile();

// ES VERSION
import { config } from "seyfert";

export default config.bot({
  token: process.env.DISCORD_CLIENT_TOKEN,
  locations: {
    base: process.env.PROD ? "dist" : "src",
    commands: "commands",
    events: "events/discord",
    langs: "langs",
  },
  intents: ["Guilds", "GuildMembers", "GuildInvites", "GuildVoiceStates"],
});
