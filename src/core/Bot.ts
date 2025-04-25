import { Client, ClientOptions } from "seyfert";
import LavaManager from "./LavaManager";
import { LavalinkManager } from "lavalink-client/dist/types";
import { CLIENT } from "../config";
import { LavalinkManagerEvents } from "../utils/customEventLoader";
import enUS from "src/langs/en-US";
import { getGuildLocaleById } from "src/utils/misc";

export default class Bot extends Client {
  default_volume = 100;
  defaultLocale = "en-US";
  modules: {
    lavalink: LavalinkManager;
  } = {
    lavalink: LavaManager(this),
  };

  constructor(options?: ClientOptions) {
    super(options);
    this.modules.lavalink.init({
      id: CLIENT.id,
    });

    LavalinkManagerEvents(this, this.modules.lavalink);
  }

  getLangs(locale: string = "es-419"): typeof enUS {
    return this.langs.values[locale] || this.langs.values["es-419"];
  }

  async getGuildLang(guildId: string) {
    const locale = await getGuildLocaleById(this, guildId);
    return this.getLangs(locale);
  }
}
