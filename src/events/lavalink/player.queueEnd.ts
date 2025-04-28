import { Player } from "lavalink-client";
import Bot from "../../core/Bot";

export default {
  data: {
    name: "queueEnd",
  },
  async run(bot: Bot, player: Player) {
    bot.logger.info(`Queue ended for player ${player.options.guildId}`);
  },
};
