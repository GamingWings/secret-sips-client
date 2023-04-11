class MockWebSocket {
  url: string;
  readyState: number;
  bufferedMessages: Array<any>;
  handlers: object;
  CONNECTING = WebSocket.CONNECTING;
  OPEN = WebSocket.OPEN;
  CLOSING = WebSocket.CLOSING;
  CLOSED = WebSocket.CLOSED;

  constructor(url) {
    this.url = url;
    this.readyState = WebSocket.CONNECTING;
    this.bufferedMessages = [];
    this.handlers = {
      open: [],
      message: [],
      close: [],
      error: [],
    };

    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      this.triggerEvent("open");
      this.bufferedMessages.forEach((message) => {
        this.triggerEvent("message", { data: message });
      });
      this.bufferedMessages = [];
    }, 0);
  }

  send(data) {
    if (this.readyState === WebSocket.OPEN) {
      setTimeout(() => {
        this.triggerEvent("message", { data });
      }, 0);
    } else {
      this.bufferedMessages.push(data);
    }
  }

  close() {
    this.readyState = WebSocket.CLOSED;
    this.triggerEvent("close");
  }

  addEventListener(type, listener) {
    if (type in this.handlers) {
      console.log("handling");
      this.handlers[type].push(listener);
    }
  }

  triggerEvent(type, event = {}) {
    if (type in this.handlers) {
      this.handlers[type].forEach((handler) => {
        handler.call(this, Object.assign({}, event, { type }));
      });
    }
  }
}

export default MockWebSocket;
