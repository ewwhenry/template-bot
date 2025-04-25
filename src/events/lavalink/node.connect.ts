import { LavalinkNode } from "lavalink-client";
import Bot from "src/core/Bot";

export default {
  data: {
    name: "connect",
  },
  async run(bot: Bot, node: LavalinkNode) {
    bot.logger.info(`Lavalink node ${node.options.id} connected`);
  },
};
