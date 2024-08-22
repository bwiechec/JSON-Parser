import { createContext, useContext, useState } from "react";
import { Settings } from "../types/settings";

interface SettingsContext {
  settings: Settings | undefined;
  setSettings: (settings: Settings) => void;
}

const SettingsContext = createContext<SettingsContext | undefined>(undefined);

export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return settings;
};

export const SettingsProvider = ({
  children,
  value,
}: {
  children: JSX.Element;
  value: Settings | undefined;
}) => {
  const [settings, setSettings] = useState<Settings | undefined>(value);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
