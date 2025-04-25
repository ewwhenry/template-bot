import {
  Command,
  Declare,
  CommandContext,
  createUserOption,
  Options,
  LocalesT,
} from "seyfert";

const options = {
  user: createUserOption({
    description: "The user to get the avatar of",
    description_localizations: {
      "en-US": "The user to get the avatar of",
      "pt-BR": "O usuário para obter o avatar",
      "es-ES": "El usuario para obtener el avatar",
      "es-419": "El usuario para obtener el avatar",
    },
    required: false,
  }),
};

@Declare({
  name: "avatar",
  description: "Get the avatar of a user",
})
@LocalesT("commands.avatar.name", "commands.avatar.description")
@Options(options)
export default class AvatarCommand extends Command {
  async run(ctx: CommandContext<typeof options>) {
    const user = ctx.options.user || ctx.author;
    const avatarUrl = user.avatarURL({ size: 1024 });
    return ctx.editOrReply({ content: avatarUrl });
  }
}
