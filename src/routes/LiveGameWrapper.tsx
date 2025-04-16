import React, { useState, useEffect, ReactElement } from "react";

interface UserContextShape {
  setReady: Function;
  hasWs: boolean;
  setConnectionUrl: Function;
}
  
export const LiveGameContext = React.createContext<UserContextShape>(
  {} as UserContextShape
);

export const LiveGameProvider = ({ children }: { children: ReactElement }) => {
  const [ready, setReady] = useState(false);
  const [hasWs, setHasWs] = useState(false);
  const [connectionUrl, setConnectionUrl] = useState<string | null>(null)

  console.log('env', process.env.REACT_APP_SERVER_URL)

  useEffect(() => {
    if (connectionUrl) {
      const Code = "Jenn";
      const UserName = "Less";

      const urlParams = new URLSearchParams({
        Code,
        UserName,
      });
      // Check if the WebSocket is already open, if so, return

      // Check if the WebSocket is already open, if so, return
      if (
        global.gameSocket &&
        global.gameSocket.readyState === WebSocket.OPEN
      ) {
        console.log("WebSocket is already open.");
        return;
      }

      const wsURL = `ws://localhost:5156/${connectionUrl}`; // Replace with your WebSocket URL
      global.gameSocket = new WebSocket(wsURL);

      global.gameSocket.addEventListener("open", () => {
        console.log("WebSocket connection opened");
        setHasWs(true);
        // Navigate to the 'create' route with parameters
      });

      global.gameSocket.addEventListener("message", (event: MessageEvent) => {
        console.log(`Received message: ${event.data}`);
      });

      global.gameSocket.addEventListener("close", () => {
        console.log("WebSocket connection closed");
      });

      global.gameSocket.addEventListener("error", (error: Event) => {
        console.log("i errored");
        console.error("WebSocket error:", error);
      });
    }

    // Close the WebSocket connection when the component unmounts
    return () => {
      if (global.gameSocket) {
        global.gameSocket.close();
      }
    };
  }, [connectionUrl]);

  return (
    <LiveGameContext.Provider
      value={{
        setReady,
        setConnectionUrl,
        hasWs,
      }}
    >
      {children}
    </LiveGameContext.Provider>
  );
};
