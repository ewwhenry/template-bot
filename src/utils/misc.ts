import fs from "node:fs";
import crypto from "node:crypto";
import Bot from "../core/Bot";

export function shouldIUpdateCommands(client: Bot) {
  var previous_hash = "";
  if (fs.existsSync("commands.hash")) {
    previous_hash = fs.readFileSync("commands.hash", "utf-8");
  }

  const actual_hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(client.commands.values))
    .digest("hex");

  if (previous_hash !== actual_hash) {
    fs.writeFileSync("commands.hash", actual_hash);

    return true;
  } else return false;
}

export function formatMS_HHMMSS(num: number) {
  return [86400000, 3600000, 60000, 1000, 1]
    .reduce((p: number[], c: number) => {
      let res = ~~(num / c);
      num -= res * c;
      return [...p, res];
    }, [])
    .map((v, i) =>
      i <= 1 && v === 0
        ? undefined
        : [
            i === 4 ? "." : "",
            v < 10 ? `0${v}` : v,
            [" Days, ", ":", ":", "", ""][i],
          ].join("")
    )
    .filter(Boolean)
    .slice(0, -1)
    .join("");
}

export const delay = async (ms: number) =>
  new Promise((r) => setTimeout(() => r(true), ms));

export async function getGuildLocaleById(client: Bot, id: string) {
  const guild = await client.guilds.fetch(id);
  if (!guild) return client.defaultLocale;

  return guild.preferredLocale || client.defaultLocale;
}
