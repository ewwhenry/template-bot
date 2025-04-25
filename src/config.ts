process.loadEnvFile(".env");

import { LavalinkNodeOptions } from "lavalink-client";

export const CLIENT = {
  id: process.env.DISCORD_CLIENT_ID!,
  token: process.env.DISCORD_CLIENT_TOKEN!,
  username: "Template",
};

/**
 * There are some lavalink nodes that are public, but first one. The first one is localhost in case you want to run your own lavalink server. (Check https://github.com/ewwhenry/lavalink-config for a Lavalink configuration)
 * The rest are public lavalink nodes that are free to use. You can add your own lavalink nodes here if you want to.
 * Just make sure you add the correct host, port, whether or not it is secure (if it has SSL), authorization (password) and that it is running on Lavalink V4.
 * For more lavalink servers, check: https://lavalink.darrennathanael.com/
 **/
export const LAVANODES: LavalinkNodeOptions[] = [
  {
    host: "localhost",
    port: 2333,
    authorization: "localhost",
    secure: false,
    id: "Localhost",
  },
  {
    host: "lava-v4.ajieblogs.eu.org",
    port: 80,
    authorization: "https://dsc.gg/ajidevserver",
    secure: false,
    id: "Ajidev",
    closeOnError: false,
  },
  {
    host: "unknownzop.mooo.com",
    port: 25575,
    authorization: "yourpasswordhere",
    secure: false,
    id: "Unknownz",
    closeOnError: false,
  },
  {
    host: "lavahatry4.techbyte.host",
    port: 3000,
    authorization: "NAIGLAVA-dash.techbyte.host",
    secure: false,
    id: "Techbyte",
  },
  {
    host: "lava-all.ajieblogs.eu.org",
    port: 80,
    authorization: "https://dsc.gg/ajidevserver",
    secure: false,
    id: "Ajidev2",
  },
  {
    host: "lavalink.serenetia.com",
    port: 80,
    authorization: "https://dsc.gg/ajidevserver",
    secure: false,
    id: "Serenetia",
  },
  {
    host: "lava-us.catfein.co.id",
    port: 5000,
    authorization: "catfein",
    secure: false,
    id: "Catfein",
  },
  {
    host: "lavalinkv4.serenetia.com",
    port: 80,
    authorization: "https://dsc.gg/ajidevserver",
  },
];
