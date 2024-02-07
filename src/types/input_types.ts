export interface CreateGameInputs {
  Rounds: number;
  MinSecrets: number;
  TimerLength: number;
  UserName: string;
}

export interface JoinGameInputs {
  UserName: string;
  Code: string;
}
