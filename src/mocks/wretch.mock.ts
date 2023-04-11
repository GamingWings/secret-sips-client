type OutputFn<T> = (value: T) => void;

type MockWretch = {
  post: (data) => MockWretch;
  output: (fn: OutputFn<any>) => void;
  json: () => Promise<any>;
};

export const mockWretch = (url: string): MockWretch => {
  let data = null;

  const post = (input) => {
    data = input;
    return api;
  };

  const json = () => {
    return Promise.resolve({ mocked: data });
  };

  const output = (fn: OutputFn<any>) => {
    fn(data);
  };

  const api = {
    post,
    output,
    json,
  };

  return api;
};
