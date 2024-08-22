import { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { parseJsonToTypeScript } from "../../helper/parser";
import { CodeBlock } from "../CodeBlock/CodeBlock";
import { Box } from "@mui/material";

export const CodePanel = () => {
  const [code, setCode] = useState("");
  const [parsedCode, setParsedCode] = useState("");
  const { settings } = useSettings();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
  });

  const handleSetSnackbarData = (data: { open: boolean; message: string }) => {
    setSnackbarData(data);
  };

  const handleParseCode = (value: string) => {
    if (!value) {
      setParsedCode("");
      setCode("");
      setSnackbarData({ open: false, message: "" });
      return;
    }

    try {
      setParsedCode(parseJsonToTypeScript(JSON.parse(value), "root", settings));
      setSnackbarData({ open: false, message: "" });
    } catch (e: any) {
      setSnackbarData({ open: true, message: e.toString() || "Invalid JSON" });
    }
  };

  useEffect(() => {
    handleParseCode(code);
  }, [settings?.indentation, settings?.declarationType]);

  const handleCodeChange = (value: string) => {
    handleParseCode(value);

    setCode(value.toString());
  };

  return (
    <Box display="grid" gridTemplateColumns="auto auto" width="100%">
      <CodeBlock
        title="JSON"
        code={code}
        handleCodeChange={handleCodeChange}
        snackbarData={snackbarData}
        setSnackbarData={handleSetSnackbarData}
        dataDirection="write"
      />
      <CodeBlock
        title={"TypeScript"}
        code={parsedCode}
        dataDirection="read"
        setSnackbarData={handleSetSnackbarData}
      />
    </Box>
  );
};
