import { Schema, model } from "mongoose";
import WelcomeSettingsSchema from "./WelcomeSettings";
import InviteTrackingSettingsSchema from "./InviteTrackingSettings";

type Guild = {
  id: string;
};

export const GuildSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  welcomeSettings: {
    type: WelcomeSettingsSchema,
    default: () => ({}),
  },
  inviteTrackingSettings: {
    type: InviteTrackingSettingsSchema,
    default: () => ({}),
  },
});
export const GuildModel = model("Guild", GuildSchema, "guilds");
