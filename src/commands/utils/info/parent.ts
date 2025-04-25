import { Command, Declare, CommandContext, Options } from "seyfert";
import ServerInfoCommand from "./server.command";

@Declare({
  name: "info",
  description: "Information.",
})
@Options([ServerInfoCommand])
export default class ParentCommand extends Command {}
