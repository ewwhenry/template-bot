import { LavalinkNode } from "lavalink-client";
import Bot from "src/core/Bot";

export default {
  data: {
    name: "error",
  },
  async run(bot: Bot, node: LavalinkNode, error: any) {
    bot.logger.error(`Lavalink node ${node.options.id} error: ${error}`);
  },
};
