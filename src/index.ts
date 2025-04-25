import bot from "./bot";
import { shouldIUpdateCommands } from "./utils/misc";

bot.start().then(() => {
  bot.logger.info("Bot started successfully");
  if (shouldIUpdateCommands(bot)) {
    bot.logger.info("Updating commands...");
    bot
      .uploadCommands()
      .then(() => {
        bot.logger.info("Commands updated successfully");
      })
      .catch((err) => {
        bot.logger.error("Error updating commands", err);
      });
  }
});
