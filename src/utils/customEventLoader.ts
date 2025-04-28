import type {
  LavalinkManager,
  LavalinkManagerEvents as LLME,
  NodeManagerEvents,
} from "lavalink-client";
import Bot from "../core/Bot";
import events from "../events/lavalink/index";
/**
 * @description This function loads all the events for the LavalinkManager.
 * @param {LavalinkManager} LavalinkManager - The LavalinkManager instance.
 */
export async function LavalinkManagerEvents(
  bot: Bot,
  LavalinkManager: LavalinkManager
) {
  for (const nodeEvent of events.nodeEvents) {
    const event = nodeEvent as any;
    bot.logger.debug(`Loading node event ${nodeEvent.data.name}`);
    if (nodeEvent.data.name) {
      LavalinkManager.nodeManager.on(
        event.data.name as keyof NodeManagerEvents,
        (...args: any[]) => event.run(bot, ...args)
      );
    }
  }

  for (const playerEvent of events.playerEvents) {
    const event = playerEvent as any;
    bot.logger.debug(`Loading player event ${playerEvent.data.name}`);
    if (playerEvent.data.name) {
      LavalinkManager.on(event.data.name as keyof LLME, (...args: any[]) =>
        event.run(bot, ...args)
      );
    }
  }
}
