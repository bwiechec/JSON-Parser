// TODO
// 1. Przełącznik na ilość spacji
// 2. Przełącznik na type / interface
// 3. Przełącznik na tworzenie nowych typów dla tablicowych elementów, czyli tak jak niżej np. gdy mamy tablicę, to
// czy robić np. Root = Root2 [] i Root2 osobno czy od razu Root[]
// 4. Komponent code mirror, lub podobne: https://blog.logrocket.com/best-code-editor-components-react/

import { Settings } from "../types/settings";

export const firstLetterToUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

type tsResponse = (any[][] | (string | String[])[])[];

const INDENTATION = {
  "2 spaces": "  ",
  "4 spaces": "    ",
  Tabulation: "\t",
};

const mapResponseToString = (tsResponse: tsResponse, settings: Settings) => {
  let returnString = "";

  tsResponse.forEach((interfaceEntry, key) => {
    if (typeof interfaceEntry[1] === "string") {
      return;
    }

    const isType = settings.declarationType === "Type";

    returnString += `export ${settings.declarationType.toLowerCase()} ${
      interfaceEntry[0]
    }${isType ? " = " : " "}{\n`;

    interfaceEntry[1].forEach((types) => {
      returnString += `${INDENTATION[settings?.indentation]}${types}${
        isType ? ";" : ""
      }\n`;
    });

    if (key === tsResponse.length - 1) {
      returnString += `}\n`;
      return;
    }

    returnString += `}\n\n`;
  });

  return returnString;
};

const mapEntries = (interfaceName: string, object: Object | Object[]) => {
  const tsResponse: tsResponse = [];
  interfaceName = firstLetterToUpperCase(interfaceName);
  const entries = Array.isArray(object)
    ? Object.entries(object[0])
    : Object.entries(object);

  const mappedEntries: String[] = [];

  entries.forEach((entry) => {
    if (typeof entry[1] === "object") {
      const recursiveResponse = mapEntries(entry[0], entry[1]);

      mappedEntries.push(`${entry[0]}: ${recursiveResponse.interfaceName}`);
      tsResponse.push(...recursiveResponse.tsResponse);
    } else
      mappedEntries.push(
        `${entry[0]}: ${firstLetterToUpperCase(typeof entry[1])}`
      );
  });
  if (Array.isArray(object)) {
    tsResponse.unshift([interfaceName, mappedEntries]);
    return { interfaceName: interfaceName + "[]", tsResponse };
  }
  tsResponse.unshift([interfaceName, mappedEntries]);

  return { interfaceName, tsResponse };
};

export const parseJsonToTypeScript = (
  json: Object | Object[],
  name: string = "root",
  settings?: Settings
) => {
  if (!settings) {
    return "";
  }

  const { tsResponse } = mapEntries(name, json);

  const returnString = mapResponseToString(tsResponse, settings);

  return returnString;
};
