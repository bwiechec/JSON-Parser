import "./App.css";
import { Box } from "@mui/material";
import { Settings } from "./components/Settings/Settings";
import { SettingsProvider } from "./context/SettingsContext";
import { CodePanel } from "./components/CodePanel/CodePanel";
import { DEFAULT_SETTINGS } from "./helper/defaults";
import { Navbar } from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <SettingsProvider value={DEFAULT_SETTINGS}>
        <Box
          style={{
            display: "flex",
            width: "100vw",
            boxSizing: "border-box",
            height: "100%",
          }}
        >
          <Settings />
          <CodePanel />
        </Box>
      </SettingsProvider>
    </>
  );
};

export default App;
