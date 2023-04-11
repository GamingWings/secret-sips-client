import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useMemo, useState, useEffect } from "react";
import { styled } from "@mui/system";
import logo from "./secret-sips-logo.png";

export const LOCAL_STORAGE_THEME = "Theme";

const HomePage = styled("section")({
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "1rem",
  width: "100%",
});

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [storedTheme, setStoredTheme] = useState(
    localStorage.getItem(LOCAL_STORAGE_THEME) ?? "system"
  );

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:59458");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          secondary: {
            main: "#00ff99",
          },
          mode:
            storedTheme === "dark" || storedTheme === "light"
              ? storedTheme
              : prefersDarkMode
              ? "dark"
              : "light",
        },
      }),
    [prefersDarkMode, storedTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" sx={{ mt: 10 }} maxWidth={false}>
        <HomePage>
          <img src={logo} alt="logo" height="100%" width="100%" />
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
          <Button>Test Hit Endpoint</Button>
        </HomePage>
      </Container>
    </ThemeProvider>
  );
}

export default App;
