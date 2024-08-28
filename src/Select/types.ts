import { type ReactNode, Key } from "react";

export type Primitive =
  | string
  | number
  | bigint
  | symbol
  | boolean
  | null
  | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Callable = (...args: any) => any;

export type RawOptionObj<ValueItemType, DataType> = {
  key?: Key;
  label?: string;
  value: ValueItemType;
  disabled?: boolean;
  data: DataType;
};

// export type RawOption<ValueItemType extends BaseValueItemType, DataType> =
//   | Primitive
//   | Callable
//   | RawOptionObj<ValueItemType, DataType>;

export type RawOption<ValueItemType, DataType> = RawOptionObj<
  ValueItemType,
  DataType
>;

export type Option<ValueItemType, DataType> = {
  key: Key;
  label: string;
  value: ValueItemType;
  disabled: boolean;
  data: DataType;
};

export type SelectContext<ValueItemType> = {
  value: ValueItemType[];
  searchQuery: string;
  toggleOption: (valueItem: ValueItemType) => void;
};

export type SelectProps<ValueItemType, DataType> = {
  title?: string;
  placeholder?: string;
  placeholderIcon?: boolean;
  disabled?: boolean;
  initialOptions: RawOption<ValueItemType, DataType>[];

  value: SelectContext<ValueItemType>["value"];
  onChange: (
    value: ValueItemType[] | ((value: ValueItemType[]) => ValueItemType[])
  ) => void;
  onFilterSortOptions?: (
    options: Option<ValueItemType, DataType>[],
    searchQuery: string
  ) => Option<ValueItemType, DataType>[];

  onAddNewOption?: (
    input: string
  ) => Promise<RawOption<ValueItemType, DataType>>;

  renderOptionInValueDisplay?: (
    option: Option<ValueItemType, DataType>,
    ctx: SelectContext<ValueItemType>
  ) => ReactNode;
  renderOptionInOptionsList?: (
    option: Option<ValueItemType, DataType>,
    ctx: SelectContext<ValueItemType>
  ) => ReactNode;
};
