import { type ReactNode, createElement } from "react";
import { customAlphabet } from "nanoid";

const nanoidInt = customAlphabet("1234567890", 10);

export const generateId = () => {
  const value = nanoidInt();

  // avoid leading zero
  const pad = (parseInt(value) % 9) + 1;

  return parseInt(pad.toString() + value);
};

export const highlightSubstring = (
  textOrig: string,
  substringOrig: string,
  className: string
) => {
  if (!textOrig || !substringOrig) {
    return [textOrig];
  }

  const text = textOrig.toLowerCase();
  const substring = substringOrig.toLowerCase();

  const result: ReactNode[] = [];
  let cursor = 0;

  while (true) {
    const index = text.indexOf(substring, cursor);
    if (index === -1) {
      result.push(textOrig.slice(cursor));
      break;
    }

    result.push(textOrig.slice(cursor, index));
    cursor = index + substring.length;
    result.push(
      // <span className={className}>{textOrig.slice(index, cursor)}</span>
      createElement(
        "span",
        { className, key: index },
        textOrig.slice(index, cursor)
      )
    );
  }

  return result;
};
