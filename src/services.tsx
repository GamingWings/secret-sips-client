import { mockWretch as wretch } from "./mocks/wretch.mock";
import { CreateGameInputs } from "./types/input_types";

/**k
 * Rounds
 * minSecrets
 * TimerLength
 */

export const createGame = (inputData: CreateGameInputs) => {
  return wretch("http://localhost:44332/SecretSips/Create")
    .post(inputData)
    .json()
    .then((response) => {
      console.log(response);
    });
};
