import nodeConnect from "./node.connect";
import nodeDisconnect from "./node.disconnect";
import nodeError from "./node.error";
import playerPlayerCreate from "./player.playerCreate";
import playerPlayerDestroy from "./player.playerDestroy";
import playerQueueEnd from "./player.queueEnd";
import playerTrackStart from "./player.trackStart";

export default {
  nodeEvents: [nodeConnect, nodeDisconnect, nodeError],
  playerEvents: [
    playerPlayerCreate,
    playerPlayerDestroy,
    playerQueueEnd,
    playerTrackStart,
  ],
};
