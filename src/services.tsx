import { mockWretch as wretch } from "./mocks/wretch.mock";

const postData = {
  name: "John Doe",
  email: "john.doe@example.com",
  message: "Hello from Wretch!",
};

export const createGame = () => {
  return wretch("/api/messages")
    .post(postData)
    .json()
    .then((response) => {
      console.log(response);
    });
};
