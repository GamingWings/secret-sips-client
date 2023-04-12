import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import logo from "../secret-sips-logo.png";
import { createGame } from "../services";
import { Outlet, Link } from "react-router-dom";

const HomePageWrapper = styled("section")({
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "2rem",
  width: "100%",
});

export const HomePage = () => {
  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth={false}>
      <HomePageWrapper>
        <img src={logo} alt="logo" height="100%" width="100%" />

        <Box display="grid" gap="1rem">
          <TextField
            id="outlined-basic"
            label="Enter Code"
            variant="outlined"
          />
          <Button>Join Game</Button>
        </Box>

        <Button component={Link} to={"create"}>
          Create Game
        </Button>
      </HomePageWrapper>
    </Container>
  );
};
