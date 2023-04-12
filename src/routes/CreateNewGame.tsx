import React from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { createGame } from "../services";
import TextField from "@mui/material/TextField";

const TEMP_CREATE_INPUTS = {
  Rounds: 1,
  MinSecrets: 2,
  TimerLength: 1,
};

const HomePageWrapper = styled("section")({
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "1rem",
  width: "100%",
});

export const CreateNewGame = () => {
  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth={false}>
      <HomePageWrapper>
        <TextField id="numberRounds" label="Rounds" variant="outlined" />
        <TextField id="minSecrets" label="Min Secrets" variant="outlined" />
        <TextField id="timer" label="Timer" variant="outlined" />
        <Button onClick={() => createGame(TEMP_CREATE_INPUTS)}>
          Post Data
        </Button>
      </HomePageWrapper>
    </Container>
  );
};
