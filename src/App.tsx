import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState, useContext } from "react";
import MockWebSocket from "./mocks/webSocket.mock";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./routes/HomePage";
import { CreateNewGame } from "./routes/CreateNewGame";
import { LiveGameProvider, LiveGameContext } from "./routes/LiveGameWrapper";

export const LOCAL_STORAGE_THEME = "Theme";

interface WebSocketMessage {
  data: object;
}

interface WebSocketError {
  error: object;
}

const Test = () => {
  return <div>You in da game</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: <CreateNewGame />,
  },
  {
    path: "/game",
    element: <Test />,
  },
]);

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [storedTheme, setStoredTheme] = useState(
    localStorage.getItem(LOCAL_STORAGE_THEME) ?? "system"
  );

  // useEffect(() => {
  //   const socket = new MockWebSocket("wss://localhost:44332/SecretSips/Join");

  //   socket.addEventListener("open", () => {
  //     console.log("WebSocket connection opened");
  //   });

  //   socket.addEventListener("message", (event: WebSocketMessage) => {
  //     console.log(`Received message: ${event.data}`);
  //   });

  //   socket.addEventListener("close", () => {
  //     console.log("WebSocket connection closed");
  //   });

  //   socket.addEventListener("error", (event: WebSocketError) => {
  //     console.error("WebSocket error:", event.error);
  //   });

  //   // Close the WebSocket connection when the component unmounts
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

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
    <LiveGameProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LiveGameProvider>
  );
}

export default App;

/**
 * <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <WsProvider>
          <Route path="/blog/*" element={<BlogApp />} />
          <Route path="/users/*" element={<UserApp />} />
        </WsProvider
      </Routes>
    </BrowserRouter>

 */
