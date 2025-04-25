import { Command, CommandContext, Declare } from "seyfert";

@Declare({
  name: "ping",
  description: "Ping the bot to check if it's alive.",
})
export default class PingCommand extends Command {
  async run(ctx: CommandContext) {
    const start = Date.now();
    await ctx.editOrReply({ content: "Pinging..." });
    const end = Date.now();

    const ping = end - start;
    const apiPing = ctx.client.latency;

    await ctx.editOrReply({
      content: `Pong!\n-# Latency: ${ping}ms. API Latency: ${apiPing}ms.`,
    });
  }
}
