import React, { useState, ChangeEvent, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import logo from "../secret-sips-logo.png";
import { createSocketConnection } from "../services";
import { Outlet, Link, useSearchParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


export const LiveGameWrapper = () => {
  const [searchParams] = useSearchParams();
  
  // useEffect(() => {
  //   const Code = searchParams.get('Code') || ''
  //   const UserName = searchParams.get('UserName') || ''
  //   createSocketConnection({Code, UserName})
  // }, [])

  useEffect(() => {

    const Code = searchParams.get('Code') || ''
    const UserName = searchParams.get('UserName') || ''

    if (Code === '' && UserName === '') {
      return
    }
    const urlParams = new URLSearchParams({
      Code,
      UserName,
    });
    // Check if the WebSocket is already open, if so, return
    
      // Check if the WebSocket is already open, if so, return
  if (global.gameSocket && global.gameSocket.readyState === WebSocket.OPEN) {
    console.log("WebSocket is already open.");
    return;
  }
  
    const wsURL = `ws://localhost:5156/SecretSips/Join?${urlParams}`; // Replace with your WebSocket URL
    global.gameSocket = new WebSocket(wsURL);

    global.gameSocket.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    global.gameSocket.addEventListener("message", (event: MessageEvent) => {
      console.log(`Received message: ${event.data}`);
    });

    global.gameSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    global.gameSocket.addEventListener("error", (error: Event) => {
      console.error("WebSocket error:", error);
    });

    // Close the WebSocket connection when the component unmounts
    return () => {
      console.log(global.gameSocket)
      if (global.gameSocket) {
        global.gameSocket.close();

      }
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};
