// import { mockWretch as wretch } from "./mocks/wretch.mock";
import wretch from "wretch";
import { CreateGameInputs, JoinGameInputs } from "./types/input_types";

/**k
 * Rounds
 * minSecrets
 * TimerLength
 */

export const createGame = (inputData: CreateGameInputs) => {
  // const urlParams = new URLSearchParams({
  //   UserName: "Jenn",
  //   Rounds: '1',
  //   MinSecrets: '2',
  //   TimerLength: '1',
  // });
  // return wretch(`ws://localhost:5156/SecretSips/Create?${urlParams}`)
  //   .get()
  //   .json()
  //   .then((response) => {
  //     console.log(response);
  //   });

  global.gameSocket.send("hi");
};

export const joinGame = ({ Code, UserName }: JoinGameInputs) => {
  const urlParams = new URLSearchParams({
    Code,
    UserName,
  });
  return wretch(`ws://localhost:5156/SecretSips/Join?${urlParams}`)
    .get()
    .json()
    .then((response) => {
      console.log(response);
    });
};

export const createSocketConnection = ({
  Code,
  UserName,
}: {
  Code: string;
  UserName: string;
}) => {
  const urlParams = new URLSearchParams({
    Code,
    UserName,
  });
  // Check if the WebSocket is already open, if so, return
  if (global.gameSocket && global.gameSocket.readyState === WebSocket.OPEN) {
    console.log("WebSocket is already open.");
    return;
  }

  const wsURL = `ws://localhost:5156/SecretSips/Join?${urlParams}`; // Replace with your WebSocket URL

  // Instantiate WebSocket
  global.gameSocket = new WebSocket(wsURL);

  // WebSocket event listeners
  global.gameSocket.onopen = function (event: Event) {
    console.log("WebSocket connected successfully.");
  };

  global.gameSocket.onmessage = function (event: MessageEvent) {
    console.log("Message received:", event.data);
    // Handle incoming messages here
  };

  global.gameSocket.onerror = function (error: Event) {
    console.error("WebSocket error:", error);
  };

  global.gameSocket.onclose = function (event: CloseEvent) {
    console.log("WebSocket closed:", event);
  };
};
