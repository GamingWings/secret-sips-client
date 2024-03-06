import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import logo from "../secret-sips-logo.png";
import { createSocketConnection } from "../services";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { JoinGameInputs } from "../types/input_types";
import {LiveGameContext} from './LiveGameWrapper';

const HomePageWrapper = styled("section")({
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "2rem",
  width: "100%",
});

export const HomePage = () => {

  const { setConnectionUrl } = useContext(LiveGameContext);

  
  const [inputs, setInputs] = useState<JoinGameInputs>({
    UserName: "",
    Code: "",
  });

  const onChange = (
    { target: { value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const {hasWs} = useContext(LiveGameContext)

  const navigate = useNavigate();
  useEffect(() => {
    if (hasWs) {
      navigate({
        pathname: "/game",
      });
    }
  }, [hasWs]);

  function createSearchParams(inputs: JoinGameInputs): string {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      params.append(key, value);
    });
    return params.toString();
  }

  const handleClickJoin = () => {
    // Define your parameters
    
    console.log(createSearchParams(inputs))
   setConnectionUrl(`SecretSips/Join?${createSearchParams(inputs)}`)
  };

  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth={false}>
      <HomePageWrapper>
        <img src={logo} alt="logo" height="100%" width="100%" />

        <Box display="grid" gap="1rem">
          <TextField
            id="userName"
            label="User Name"
            variant="outlined"
            value={inputs.UserName}
            onChange={(e) => {
              onChange(e, "UserName");
            }}
          />
          <TextField
            id="outlined-basic"
            label="Enter Code"
            variant="outlined"
            value={inputs.Code}
            onChange={(e) => {
              onChange(e, "Code");
            }}
          />
          <Button
            onClick={handleClickJoin}
            disabled={inputs.Code === "" && inputs.UserName === ""}
          >
            Join Game
          </Button>
        </Box>

        <Button component={Link} to={"create"}>
          Create Game
        </Button>
      </HomePageWrapper>
    </Container>
  );
};
