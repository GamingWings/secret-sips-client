import React from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { createGame } from "../services";

const TEMP_CREATE_INPUTS = {
  Rounds: 1,
  MinSecrets: 2,
  TimerLength: 1,
};

const HomePageWrapper = styled("section")({
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "2rem",
  width: "100%",
});

export const CreateNewGame = () => {
  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth={false}>
      <HomePageWrapper>
        <Button onClick={() => createGame(TEMP_CREATE_INPUTS)}>
          Create Game
        </Button>
      </HomePageWrapper>
    </Container>
  );
};
