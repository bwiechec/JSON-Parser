import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Box, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import { PasteButton } from "../PasteButton/PasteButton";
import { CopyButton } from "../CopyButton/CopyButton";
import CloseIcon from "@mui/icons-material/Close";

interface SnackbarData {
  open: boolean;
  message: string;
}

interface CodeBlockProps {
  title: string;
  code: string;
  handleCodeChange?: (value: string) => void;
  setSnackbarData?: (data: SnackbarData) => void;
  snackbarData?: SnackbarData;
  dataDirection?: "write" | "read";
}

export const CodeBlock = ({
  code,
  title,
  handleCodeChange,
  snackbarData,
  setSnackbarData,
  dataDirection,
}: CodeBlockProps) => {
  const handleCopy = () => {
    setSnackbarData?.({ open: true, message: "Copied to clipboard" });
    navigator.clipboard.writeText(code);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => handleCodeChange?.(text));
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarData?.({ open: true, message: "Copied to clipboard" });
    setSnackbarData?.({ open: false, message: snackbarData?.message ?? "" });
  };

  return (
    <Box
      height="100%"
      border="1px solid #000"
      overflow="hidden"
      maxWidth="100%"
    >
      <Box
        bgcolor="#1e1e1e"
        color="white"
        p="0.2rem 1rem"
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h6">{title}</Typography>
        {dataDirection === "write" ? (
          <PasteButton onClick={handlePaste} />
        ) : (
          <CopyButton onClick={handleCopy} />
        )}
      </Box>
      <CodeMirror
        value={code}
        editable={dataDirection !== "read"}
        height="100%"
        onChange={(value) => handleCodeChange?.(value)}
        theme={vscodeDark}
        style={{
          boxSizing: "border-box",
          height: "100%",
        }}
      />
      {snackbarData && (
        <Snackbar
          open={snackbarData?.open}
          message={snackbarData?.message}
          autoHideDuration={3000}
          onClose={handleClose}
          action={<CloseIcon fontSize="small" onClick={handleClose} />}
        />
      )}
    </Box>
  );
};
