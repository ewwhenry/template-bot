import { LavalinkManager } from "lavalink-client";
import { sendToShard } from "../utils/voice";
import { CLIENT, LAVANODES } from "../config";
import type Bot from "./Bot";

export default (client: Bot) =>
  new LavalinkManager({
    nodes: LAVANODES,
    sendToShard: sendToShard(client),
    client: { id: CLIENT.id, username: CLIENT.username },
  });
