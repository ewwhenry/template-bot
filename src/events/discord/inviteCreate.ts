import { createEvent } from "seyfert";

export default createEvent({
  data: {
    name: "inviteCreate",
    once: false,
  },
  run: async (invite, client) => {},
});
