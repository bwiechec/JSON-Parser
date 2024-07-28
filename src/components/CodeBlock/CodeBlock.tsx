import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Box, Snackbar, Typography } from "@mui/material";
import { PasteButton } from "../PasteButton/PasteButton";
import { CopyButton } from "../CopyButton/CopyButton";

interface SnackbarData {
  open: boolean;
  message: string;
}

interface CodeBlockProps {
  title: string;
  code: string;
  handleCodeChange?: (value: string) => void;
  snackbarData?: SnackbarData;
  dataDirection?: "write" | "read";
}

export const CodeBlock = ({
  code,
  title,
  handleCodeChange,
  snackbarData,
  dataDirection,
}: CodeBlockProps) => {
  return (
    <Box height="100dvh" width="40vw" border="1px solid #000">
      <Box
        bgcolor="#1e1e1e"
        color="white"
        p="0.2rem 1rem"
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h6">{title}</Typography>
        {dataDirection === "write" ? (
          <PasteButton
            onClick={() =>
              navigator.clipboard
                .readText()
                .then((text) => handleCodeChange?.(text))
            }
          />
        ) : (
          <CopyButton onClick={() => navigator.clipboard.writeText(code)} />
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
      <Snackbar open={snackbarData?.open} message={snackbarData?.message} />
    </Box>
  );
};
