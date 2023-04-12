// @ts-nocheck
class MockWebSocket {
  url: string;
  readyState: number;
  bufferedMessages: Array<any>;
  handlers: any;
  CONNECTING = WebSocket.CONNECTING;
  OPEN = WebSocket.OPEN;
  CLOSING = WebSocket.CLOSING;
  CLOSED = WebSocket.CLOSED;

  constructor(url: string) {
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

  send(data: any) {
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

  addEventListener(type: string, listener: object) {
    if (type in this.handlers) {
      console.log("handling");
      this.handlers[type].push(listener);
    }
  }

  triggerEvent(type: any, event: object = {}) {
    if (type in this.handlers) {
      this.handlers[type].forEach((handler: any) => {
        handler.call(this, Object.assign({}, event, { type }));
      });
    }
  }
}

export default MockWebSocket;
