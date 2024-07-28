import "./App.css";
import { parseJsonToTypeScript } from "./helper/parser";
import { useState } from "react";
import { CodeBlock } from "./components/CodeBlock/CodeBlock";
import { Box } from "@mui/material";
import { Settings } from "./components/Settings/Settings";

const App = () => {
  const [code, setCode] = useState("");
  const [parsedCode, setParsedCode] = useState("");
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
  });

  const handleCodeChange = (value: string) => {
    if (!value) {
      setParsedCode("");
      setCode("");
      setSnackbarData({ open: false, message: "" });
      return;
    }

    try {
      setParsedCode(parseJsonToTypeScript(JSON.parse(value)));
      setSnackbarData({ open: false, message: "" });
    } catch (e: any) {
      setSnackbarData({ open: true, message: e.toString() || "Invalid JSON" });
    }

    setCode(value.toString());
  };

  return (
    <Box style={{ display: "flex", width: "100vw", boxSizing: "border-box" }}>
      <Settings />
      <CodeBlock
        title="JSON"
        code={code}
        handleCodeChange={handleCodeChange}
        snackbarData={snackbarData}
        dataDirection="write"
      />
      <CodeBlock title={"TypeScript"} code={parsedCode} dataDirection="read" />
    </Box>
  );
};

export default App;
