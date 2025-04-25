import defaultLocale from "./langs/en-US";
import Bot from "./core/Bot";
import { ParseClient, ParseLocales } from "seyfert";

declare module "seyfert" {
  interface UsingClient extends ParseClient<Bot> {}
  interface DefaultLocale extends ParseLocales<typeof defaultLocale> {}
}
