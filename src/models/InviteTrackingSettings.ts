import { Schema } from "mongoose";

const InviteTrackingSettingsSchema = new Schema(
  {
    channelId: {
      type: String,
      required: true,
      default: null, // ID del canal de bienvenida
    },
    message: {
      type: String,
      required: true,
      default:
        "{inviter.username} invited {invited.username}, now he has {total_invited} invitations!",
    },
    sendMessage: {
      type: Boolean,
      default: true, // Para habilitar o deshabilitar el envío de mensajes
    },
    active: {
      type: Boolean,
      default: true, // Para habilitar o deshabilitar el sistema de bienvenida
    },
  },
  { _id: false }
); // No generar un _id para el subdocumento

export default InviteTrackingSettingsSchema;
