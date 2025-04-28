import axios from "axios";
import {
  Command,
  CommandContext,
  Declare,
  Container,
  TextDisplay,
  Section,
  Thumbnail,
  File,
  Separator,
  MediaGallery,
  MediaGalleryItem,
} from "seyfert";
import { Spacing } from "seyfert/lib/types";
import { delay } from "src/utils/misc";

@Declare({
  name: "ping",
  description: "Ping the bot to check if it's alive.",
})
export default class PingCommand extends Command {
  override async run(ctx: CommandContext) {
    const start = Date.now();
    await ctx.deferReply(false, false);
    const end = Date.now();

    const ping = end - start;
    const apiPing = ctx.client.latency;

    let content = `## Pong!\n-# Latency: ${ping}ms. API Latency: ${apiPing}ms.`;

    const section = new Section()
      .setAccessory(
        new Thumbnail()
          .setMedia(ctx.client.me!.avatarURL())
          .setDescription("This is a thumbnail image")
      )
      .addComponents(new TextDisplay().setContent(content));

    const container = new Container().addComponents(section).setSpoiler(false);

    await ctx.editOrReply({
      components: [container],
      flags: 1 << 15,
    });
  }
}
