import type { LavalinkManager } from "lavalink-client";
import { globSync } from "node:fs";
import path from "node:path";
import Bot from "src/core/Bot";

const PLAYER_EVENTS_PATTERN = "src/events/lavalink/player.*.ts";
const NODE_EVENTS_PATTERN = "src/events/lavalink/node.*.ts";

/**
 * @description This function loads all the events for the LavalinkManager.
 * @param {LavalinkManager} LavalinkManager - The LavalinkManager instance.
 */
export async function LavalinkManagerEvents(
  bot: Bot,
  LavalinkManager: LavalinkManager
) {
  const playerEvents = globSync(path.resolve(PLAYER_EVENTS_PATTERN));
  const nodeEvents = globSync(path.resolve(NODE_EVENTS_PATTERN));

  for (const file of playerEvents) {
    const event = (await import(file)).default;
    bot.logger.debug(
      `Loading player event ${event.data.name} from file ${file}`
    );
    if (event.data.name) {
      LavalinkManager.on(event.data.name, (...args: any[]) =>
        event.run(bot, ...args)
      );
    }
  }

  for (const file of nodeEvents) {
    const event = (await import(file)).default;
    bot.logger.debug(`Loading node event ${event.data.name} from file ${file}`);
    if (event.data.name) {
      LavalinkManager.nodeManager.on(event.data.name, (...args: any[]) =>
        event.run(bot, ...args)
      );
    }
  }
}
