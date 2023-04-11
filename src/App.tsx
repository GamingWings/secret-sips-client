import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useMemo, useState, useEffect } from "react";
import { styled } from "@mui/system";
import logo from "./secret-sips-logo.png";
import MockWebSocket from "./mocks/webSocket.mock";
import Typography from "@mui/material/Typography";
import { createGame } from "./services";

export const LOCAL_STORAGE_THEME = "Theme";

const HomePage = styled("section")({
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "2rem",
  width: "100%",
});

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [storedTheme, setStoredTheme] = useState(
    localStorage.getItem(LOCAL_STORAGE_THEME) ?? "system"
  );

  useEffect(() => {
    const socket = new MockWebSocket("wss://localhost:44332/SecretSips/Join");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    socket.addEventListener("message", (event) => {
      console.log(`Received message: ${event.data}`);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event.error);
    });

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

          <Box display="grid" gap="1rem">
            <TextField
              id="outlined-basic"
              label="Enter Code"
              variant="outlined"
            />
            <Button>Join Game</Button>
          </Box>

          <Button onClick={createGame}>Create Game</Button>
        </HomePage>
      </Container>
    </ThemeProvider>
  );
}

export default App;
