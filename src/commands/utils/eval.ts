import {
  CommandContext,
  Command,
  Options,
  Declare,
  createStringOption,
  createBooleanOption,
} from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import { inspect } from "util";

const options = {
  code: createStringOption({
    description: "The code to execute.",
    required: true,
    max_length: 2048,
  }),
  keep_in_chat: createBooleanOption({
    description: "Indicates if the response must keep in the chat.",
    required: false,
  }),
};

@Declare({
  name: "eval",
  description: "Evaluates a JavaScript code and returns its output.",
})
@Options(options)
export default class Eval extends Command {
  async run(ctx: CommandContext<typeof options>) {
    const { code, keep_in_chat } = ctx.options;

    // Verificar que el usuario tenga permisos para ejecutar eval
    const allowedUsers = ["728992905460711486"]; // IDs permitidos
    if (!allowedUsers.includes(ctx.author.id)) {
      return ctx.editOrReply({
        content: "❌ No tienes permisos para usar este comando.",
      });
    }

    try {
      // Encapsular en una función asíncrona para permitir await
      let result = await (async () => eval(code))();

      // Si es un objeto, lo formateamos para mejorar la legibilidad
      if (typeof result !== "string") {
        result = inspect(result, { depth: 2 });
      }

      // Limitar la longitud del mensaje de respuesta
      if (result.length > 2000) {
        result = result.substring(0, 1997) + "...";
      }

      await ctx.editOrReply({
        content: `🖥️ **Output:**\n\`\`\`js\n${result.slice(0, 2000)}\n\`\`\``,
        flags: keep_in_chat ? MessageFlags.Ephemeral : undefined,
      });
    } catch (error) {
      await ctx.editOrReply({
        content: `⚠️ **Error:**\n\`\`\`js\n${error}\n\`\`\``.slice(0, 2000),
        flags: keep_in_chat ? MessageFlags.Ephemeral : undefined,
      });
    }
  }
}
