import { Button } from "@mui/material";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";

interface CopyButtonProps {
  onClick: () => void;
}

export const PasteButton = ({ onClick }: CopyButtonProps) => {
  return (
    <Button onClick={onClick}>
      <ContentPasteRoundedIcon />
      Paste
    </Button>
  );
};
