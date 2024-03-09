import openSocket from "socket.io-client";
import configs from "./configs";

class SocketSubscriber {
  constructor(handlers) {
    this.socket = openSocket(configs.apiUrl);
    this.addHandlers(handlers);
    this.socket.emit("chat message", "Hello from the other side");
  }

  addHandlers(handlers) {
    for (let event in handlers) {
      console.log("Attaching handler for event: " + event);
      this.socket.on(event, handlers[event]);
    }
  }
}

export const socketSubscriber = new SocketSubscriber({
  connected: () => {
    console.log("Socket Connected");
  },
});
