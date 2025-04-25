import { Player } from "lavalink-client";
import Bot from "src/core/Bot";

export default {
  data: {
    name: "playerDestroy",
  },
  async run(bot: Bot, player: Player) {
    bot.logger.info(`Player for ${player.options.guildId} destroyed`);
  },
};
