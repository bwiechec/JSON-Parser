import { Button } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

interface CopyButtonProps {
  onClick: () => void;
}

export const CopyButton = ({ onClick }: CopyButtonProps) => {
  return (
    <Button onClick={onClick}>
      <ContentCopyRoundedIcon />
      Copy
    </Button>
  );
};
