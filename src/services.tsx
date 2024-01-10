// import { mockWretch as wretch } from "./mocks/wretch.mock";
import wretch from "wretch";
import { CreateGameInputs } from "./types/input_types";

/**k
 * Rounds
 * minSecrets
 * TimerLength
 */

export const createGame = (inputData: CreateGameInputs) => {
  return wretch("http://localhost:5156/SecretSips/Create")
    .post(inputData)
    .json()
    .then((response) => {
      console.log(response);
    });
};
