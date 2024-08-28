import { type MouseEventHandler, useRef } from "react";
import cl from "classnames";

import { useOptionsListContent, useToggleOption } from "./hooks";

import XIcon from "src/assets/X.svg?react";
import ChevronDownIcon from "src/assets/chevron-down.svg?react";
import ChevronUpIcon from "src/assets/chevron-up.svg?react";
import CheckIcon from "src/assets/checkbox-list.svg?react";
import PlusIcon from "src/assets/plus.svg?react";
import SearchIcon from "src/assets/Search.svg?react";
import { highlightSubstring } from "src/lib";

import { Button } from "src/ui/Button";
import { Spinner } from "src/ui/Spinner";

import { isMapKeqEqual } from "./lib";
import { type Option, type SelectProps, type SelectContext } from "./types";
import styles from "./Select.module.scss";

const defaultRenderOptionInValueDisplay = <ValueItemType, DataType>(
  option: Option<ValueItemType, DataType>,
  ctx: SelectContext<ValueItemType>
) => {
  return (
    <div
      key={option.key}
      className={cl(styles.optionInValueDisplay, {
        [styles.disabled]: option.disabled,
      })}
    >
      {option.label}
      <Button
        className={"w-4 h-4 shrink-0"}
        PrefixIcon={XIcon}
        onClick={(evt) => {
          evt.stopPropagation();
          ctx.toggleOption(option.value);
        }}
      />
    </div>
  );
};

const defaultRenderOptionInOptionsList = <ValueItemType, DataType>(
  option: Option<ValueItemType, DataType>,
  ctx: SelectContext<ValueItemType>
) => {
  return (
    <div
      key={option.key}
      className={cl(
        styles.defaultOption,
        "text-figma-color-text-primary",
        "text-figma-text-body-default",
        {
          [styles.disabled]: option.disabled,
        }
      )}
      onClick={
        option.disabled ? undefined : () => ctx.toggleOption(option.value)
      }
    >
      <div className="text-figma-text-body-default text-figma-color-text-primary">
        {highlightSubstring(
          option.label,
          ctx.searchQuery,
          "bg-purple-100 text-figma-color-bg-accent-violet"
        )}
      </div>
      {ctx.value.includes(option.value) && (
        <CheckIcon className={styles.checkIcon} />
      )}
    </div>
  );
};

const defaultFilterSortOptions = <ValueItemType, DataType>(
  options: Option<ValueItemType, DataType>[],
  query: string
) => {
  if (query.length === 0) {
    return options;
  } else {
    return options.filter((opt) => {
      return opt.label.toLowerCase().includes(query.toLowerCase());
    });
  }
};

export const Select = <ValueItemType, DataType>({
  title,
  placeholder,
  placeholderIcon = true,
  disabled = false,
  initialOptions,
  value,
  onChange,
  onAddNewOption,
  onFilterSortOptions = defaultFilterSortOptions,
  renderOptionInValueDisplay = defaultRenderOptionInValueDisplay,
  renderOptionInOptionsList = defaultRenderOptionInOptionsList,
}: SelectProps<ValueItemType, DataType>) => {
  const {
    optionsMap,
    optionsList,
    searchQuery,
    onChangeSearchQuery,
    filteredOptionsList,
    addNewOption,
    isLoading,
    optionsListRef,
    isOptionsListVisible,
    showOptionsList,
  } = useOptionsListContent(
    initialOptions,
    onAddNewOption,
    onFilterSortOptions,
    onChange
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickShowOptionList: MouseEventHandler<HTMLElement> = (evt) => {
    evt.stopPropagation();
    showOptionsList();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleOption = useToggleOption(optionsList, onChange);

  const isEmpty = value.length === 0;
  const RightIcon = isOptionsListVisible ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <div className="text-figma-color-text-primary text-figma-text-body-accent">
          {title}
        </div>
      )}
      <div className={cl(styles.root)}>
        {isOptionsListVisible && !isLoading && (
          <div ref={optionsListRef} className={styles.optionsList}>
            {filteredOptionsList.length === 0
              ? onAddNewOption && (
                  <div className={styles.defaultOption} onClick={addNewOption}>
                    <div className="flex items-center gap-2">
                      <PlusIcon className="w-5 h-5" />
                      <div>
                        Add new option «
                        <span className="text-figma-color-text-accent">
                          {searchQuery}
                        </span>
                        »
                      </div>
                    </div>
                  </div>
                )
              : filteredOptionsList.map((option) => {
                  return renderOptionInOptionsList(option, {
                    value,
                    searchQuery,
                    toggleOption,
                  });
                })}
          </div>
        )}
        <div
          className={cl(styles.trigger, {
            [styles.empty]: isEmpty,
            [styles.loading]: isLoading,
            [styles.disabled]: disabled,
          })}
          onClick={disabled || isLoading ? undefined : onClickShowOptionList}
        >
          <div className={styles.valueDisplay}>
            {value.map((valueItem) => {
              const option = optionsMap.get(valueItem);
              if (!option) {
                return null;
              }
              return renderOptionInValueDisplay(option, {
                value,
                searchQuery,
                toggleOption,
              });
            })}
            {isEmpty && placeholderIcon && (
              <SearchIcon className="w-5 h-5 text-figma-color-icons-disabled" />
            )}
            <input
              ref={inputRef}
              placeholder={isEmpty ? placeholder : undefined}
              className={cl(styles.searchInput, "text-figma-text-body-default")}
              value={searchQuery}
              onChange={onChangeSearchQuery}
              disabled={isLoading || disabled}
            />
          </div>
          {isLoading ? (
            <Spinner innerClassName="w-5 h-5" className={"shrink-0"} />
          ) : (
            <RightIcon
              className={"w-5 h-5  text-figma-color-icons-disabled shrink-0"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export type SingleSelectProps<ValueItemType, DataType> = Omit<
  SelectProps<ValueItemType, DataType>,
  "value" | "onChange"
> & {
  value?: ValueItemType;
  onChange: (
    value: ValueItemType | ((value: ValueItemType) => ValueItemType)
  ) => void;
};

const defaultRenderOptionInValueDisplaySingle = <ValueItemType, DataType>(
  option: Option<ValueItemType, DataType>
) => {
  return (
    <div
      key={option.key}
      className={cl(styles.optionInValueDisplaySingle, {
        [styles.disabled]: option.disabled,
      })}
    >
      {option.label}
    </div>
  );
};

export const SingleSelect = <ValueItemType, DataType>({
  value,
  onChange,
  renderOptionInValueDisplay = defaultRenderOptionInValueDisplaySingle,
  ...props
}: SingleSelectProps<ValueItemType, DataType>) => {
  const onChangeMultiValue: SelectProps<ValueItemType, DataType>["onChange"] = (
    multiValueOrFunc
  ) => {
    const multiValue =
      typeof multiValueOrFunc === "function"
        ? multiValueOrFunc(value === undefined ? [] : [value])
        : multiValueOrFunc;

    onChange((currentValue) => {
      const index = multiValue.findIndex(
        (v) => !isMapKeqEqual(v, currentValue)
      );
      if (index === -1) {
        return currentValue;
      }

      return multiValue[index];
    });
  };

  return (
    <Select
      {...props}
      renderOptionInValueDisplay={renderOptionInValueDisplay}
      value={value === undefined ? [] : [value]}
      onChange={onChangeMultiValue}
    />
  );
};
