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

export const SecretInput = ({secretCount}: {secretCount: number}) => {

  return (
    <Box>
      {
        Array.from({ length: secretCount }, (_, index) => (
          <TextField
            key={index}
            id={`secret-${index}`}
            label={`Secret ${index + 1}`}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        ))
      }

          <Button
                      onClick={() => {}}
                      // disabled={inputs.Code === "" && inputs.UserName === ""}
                    >
                      Submit
          </Button>
    </Box>
  );
};

const SecretInputWrapper = () => {

  const { liveGameSecretCount } = useContext(LiveGameContext);
  return (
    <Box>
      <SecretInput secretCount={liveGameSecretCount}/>
    </Box>
  );
};

export default SecretInputWrapper