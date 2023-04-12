import { mockWretch as wretch } from "./mocks/wretch.mock";
import { CreateGameInputs } from "./types/input_types";

/**
 * Rounds
 * minSecrets
 * TimerLength
 */

export const createGame = (inputData: CreateGameInputs) => {
  return wretch("/SecretSips/Create")
    .post(inputData)
    .json()
    .then((response) => {
      console.log(response);
    });
};
