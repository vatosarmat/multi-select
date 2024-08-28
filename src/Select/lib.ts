import type { RawOptionObj, Option } from "./types";

export const isMapKeqEqual = (x: unknown, y: unknown) =>
  x === y || (Number.isNaN(x) && Number.isNaN(y));

const getDefaultLabel = (v: unknown) => {
  if (typeof v === "object") {
    return JSON.stringify(v);
  }

  if (typeof v === "undefined") {
    return "undefined";
  }

  return v.toString();
};
// const obj =
//   raw !== null && typeof raw === "object" && "value" in raw
//     ? raw
//     : {
//         value: raw,
//       };

export const refineOption = <ValueItemType, DataType>(
  obj: RawOptionObj<ValueItemType, DataType>,
  key: React.Key
): Option<ValueItemType, DataType> => {
  return {
    ...obj,
    key,
    label: "label" in obj && obj.label ? obj.label : getDefaultLabel(obj.value),
    disabled:
      "disabled" in obj && obj.disabled !== undefined ? obj.disabled : false,
  };
};
