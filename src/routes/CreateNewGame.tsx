import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { createGame } from "../services";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createSocketConnection } from "../services";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { LiveGameContext } from "./LiveGameWrapper";

const TEMP_CREATE_INPUTS = {
  UserName: "Jenn",
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
  const navigate = useNavigate();
  const { setReady, hasWs } = useContext(LiveGameContext);
  const [ userName, setUserName] = useState("");
  const [ timerLength, setTimerLength] = useState("");
  const [ minSecrets, setMinSecrets] = useState("");
  const [ rounds, setRounds] = useState("");

  useEffect(() => {
    if (hasWs) {
      navigate({
        pathname: "/game",
      });
    }
  }, [hasWs]);

  const handleClickJoin = () => {
    // Define your parameters

    console.log("test");

    // Navigate to the 'create' route with parameters
    setReady(true);
  };

  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth={false}>
      <HomePageWrapper>
        <Box mb={3}>
          <TextField 
            id="userName" 
            label="User Name" 
            variant="outlined" 
            onChange={({target: {value}}) => setUserName(value)} 
          />
        </Box>
        <TextField 
          id="numberRounds" 
          label="Rounds" 
          variant="outlined" 
          onChange={({target: {value}}) => setRounds(value)} 
          />
        <TextField
          id="minSecrets"
          label="Min Secrets"
          variant="outlined"
          onChange={({target: {value}}) => setMinSecrets(value)} 
        />
        <TextField 
          id="timer"
          label="Timer"
          variant="outlined"
          onChange={({target: {value}}) => setTimerLength(value)} 
        />
        <Button onClick={handleClickJoin}>Post Data</Button>
      </HomePageWrapper>
    </Container>
  );
};
