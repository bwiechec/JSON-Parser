import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSettings } from "../../context/SettingsContext";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS } from "../../helper/defaults";
import { Settings as SettingsInterface } from "../../types/settings";
import { GitHub, LinkedIn } from "@mui/icons-material";

const INDENTATION_OPTIONS = ["2 spaces", "4 spaces", "Tabulation"];
const DECLARATION_TYPE_OPTIONS = ["Interface", "Type"];

export const Settings = () => {
  const { settings, setSettings } = useSettings();

  const [indentation, setIndentation] = useState<
    SettingsInterface["indentation"] | undefined
  >(settings?.indentation);
  const [declarationType, setDeclarationType] = useState<
    SettingsInterface["declarationType"] | undefined
  >(settings?.declarationType);

  useEffect(() => {
    setIndentation(settings?.indentation);
    setDeclarationType(settings?.declarationType);
  }, [settings?.indentation, settings?.declarationType]);

  const handleSaveSettings = () => {
    setSettings({
      indentation: indentation as SettingsInterface["indentation"],
      declarationType: declarationType as SettingsInterface["declarationType"],
    });
  };

  const handleRestoreDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <Box
      minWidth={{ xs: "10vw", xl: "20vw" }}
      p="1rem"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Stack>
        <Typography
          display="flex"
          gap="1rem"
          alignItems="center"
          justifyContent="center"
        >
          <SettingsIcon />
          SETTINGS
        </Typography>
        <Stack gap="1rem" my="1rem" display="flex" flexDirection="column">
          {/* TODO SELECT TO NEW COMPONENT */}
          <FormControl variant="standard">
            <InputLabel htmlFor="indentation-select">Indentation:</InputLabel>
            <Select
              id="indentation-select"
              value={indentation}
              onChange={(e) =>
                setIndentation(
                  e.target.value as SettingsInterface["indentation"]
                )
              }
            >
              {INDENTATION_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="indentation-select">
              Declaration type:
            </InputLabel>
            <Select
              id="declaration-type-select"
              value={declarationType}
              onChange={(e) =>
                setDeclarationType(
                  e.target.value as SettingsInterface["declarationType"]
                )
              }
            >
              {DECLARATION_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack
          gap="1rem"
          display="grid"
          gridTemplateColumns={{ xs: "auto", xl: "auto auto" }}
          alignSelf="end"
        >
          <Button
            variant="contained"
            startIcon={<SettingsBackupRestoreIcon />}
            color="warning"
            size="medium"
            onClick={handleRestoreDefaults}
          >
            Restore defaults
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            size="medium"
            onClick={handleSaveSettings}
          >
            Save settings
          </Button>
        </Stack>
      </Stack>
      <Box display="flex" justifyContent="center" p="1rem">
        <Link
          display="flex"
          gap="1rem"
          alignItems="center"
          href="https://github.com/bwiechec"
          target="_blank"
        >
          <Typography>Bartosz Wiecheć</Typography>
          <GitHub />
        </Link>
      </Box>
    </Box>
  );
};
