// TODO
// 1. Przełącznik na ilość spacji
// 2. Przełącznik na type / interface
// 3. Przełącznik na tworzenie nowych typów dla tablicowych elementów, czyli tak jak niżej np. gdy mamy tablicę, to
// czy robić np. Root = Root2 [] i Root2 osobno czy od razu Root[]
// 4. Komponent code mirror, lub podobne: https://blog.logrocket.com/best-code-editor-components-react/

export const firstLetterToUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseJsonToTypeScript = (
  json: Object | Object[],
  name: string = "root"
) => {
  const tsResponse: (any[][] | (string | String[])[])[] = [];

  const mapEntries = (interfaceName: string, object: Object | Object[]) => {
    interfaceName = firstLetterToUpperCase(interfaceName);
    const entries = Array.isArray(object)
      ? Object.entries(object[0])
      : Object.entries(object);

    const mappedEntries: String[] = [];

    entries.forEach((entry) => {
      if (typeof entry[1] === "object") {
        mappedEntries.push(`${entry[0]}: ${mapEntries(entry[0], entry[1])}`);
      } else
        mappedEntries.push(
          `${entry[0]}: ${firstLetterToUpperCase(typeof entry[1])}`
        );
    });
    if (Array.isArray(object)) {
      tsResponse.unshift([interfaceName + "2", mappedEntries]);
      tsResponse.unshift([interfaceName, interfaceName + "2[]"]);
      return interfaceName + "2[]";
    }
    tsResponse.unshift([interfaceName, mappedEntries]);

    return interfaceName;
  };

  mapEntries(name, json);

  let returnString = "";
  tsResponse.forEach((interfaceEntry, key) => {
    if (typeof interfaceEntry[1] === "string") {
      returnString += `export type ${interfaceEntry[0]} = ${interfaceEntry[1]}\n\n`;
      return;
    }

    returnString += `export interface ${interfaceEntry[0]} {\n`;
    interfaceEntry[1].forEach((types) => {
      returnString += `\t${types}\n`;
    });

    if (key === tsResponse.length - 1) {
      returnString += `}\n`;
      return;
    }

    returnString += `}\n\n`;
  });

  return returnString;
};
