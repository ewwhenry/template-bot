import { Schema } from "mongoose";

const WelcomeSettingsSchema = new Schema(
  {
    channelId: {
      type: String,
      required: true,
      default: null, // ID del canal de bienvenida
    },
    message: {
      type: String,
      required: true,
      default: "Welcome to the server!",
    },
    backgroundUrl: {
      type: String,
      default: null, // URL de la imagen de bienvenida, si la hay
    },
    customStyles: {
      type: Object,
      default: {}, // Para almacenar estilos personalizados en formato clave-valor
    },
    active: {
      type: Boolean,
      default: true, // Para habilitar o deshabilitar el sistema de bienvenida
    },
  },
  { _id: false }
); // No generar un _id para el subdocumento

export default WelcomeSettingsSchema;
