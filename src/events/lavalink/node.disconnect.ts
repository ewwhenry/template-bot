import { LavalinkNode } from "lavalink-client";
import Bot from "../../core/Bot";

export default {
  data: {
    name: "disconnect",
  },
  async run(bot: Bot, node: LavalinkNode) {
    bot.logger.info(`Lavalink node ${node.options.id} disconnected`);
  },
};
