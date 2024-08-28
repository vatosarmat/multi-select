import { useState, useRef, useCallback, useMemo } from "react";
import { useOnClickOutside } from "usehooks-ts";

import {
  type Option,
  // type RawOption,
  type SelectProps,
  type SelectContext,
} from "./types";
import { refineOption, isMapKeqEqual } from "./lib";

export const useOptionsListContent = <ValueItemType, DataType>(
  initialOptions: SelectProps<ValueItemType, DataType>["initialOptions"],
  onAddNewOption: SelectProps<ValueItemType, DataType>["onAddNewOption"],
  onFilterSortOptions: SelectProps<
    ValueItemType,
    DataType
  >["onFilterSortOptions"],
  onChange: SelectProps<ValueItemType, DataType>["onChange"]
) => {
  //content
  const [optionsMap, setOptionsMap] = useState(() => {
    // remembers the original insertion order
    const map = new Map<ValueItemType, Option<ValueItemType, DataType>>();

    for (let i = 0; i < initialOptions.length; i++) {
      const readyOption = refineOption(initialOptions[i], i + 1);

      if (map.has(readyOption.value)) {
        console.error(
          `Ignoring duplicating value ${JSON.stringify(initialOptions[i])}`
        );
      } else {
        map.set(readyOption.value, readyOption);
      }
    }

    return map;
  });

  const optionsList = useMemo(() => {
    return Array.from(optionsMap.values());
  }, [optionsMap]);

  //filtering
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearchQuery = useCallback(
    (evt: { currentTarget: { value: string } }) => {
      setSearchQuery(evt.currentTarget.value);
    },
    []
  );

  const filteredOptionsList = useMemo(() => {
    if (onFilterSortOptions) {
      return onFilterSortOptions(optionsList, searchQuery.trim());
    }
    return optionsList;
  }, [optionsList, searchQuery, onFilterSortOptions]);

  //visibility
  const [isOptionsListVisible, setIsOptionsListVisible] = useState(false);
  const showOptionsList = useCallback(() => {
    setIsOptionsListVisible(true);
  }, []);
  const hideOptionsList = useCallback(() => {
    setIsOptionsListVisible(false);
    setSearchQuery("");
  }, []);

  const optionsListRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(optionsListRef, hideOptionsList);

  //new option
  const [isLoading, setIsLoading] = useState(false);
  const addNewOption = useCallback(async () => {
    if (onAddNewOption) {
      setIsLoading(true);
      onAddNewOption(searchQuery)
        .then((newRawOption) => {
          setOptionsMap((map) => {
            const newOption = refineOption(newRawOption, map.size + 1);
            const newMap = new Map(map);
            newMap.set(newOption.value, newOption);
            return newMap;
          });
          onChange((value) => [...value, newRawOption.value]);
          hideOptionsList();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchQuery, onAddNewOption, onChange, hideOptionsList]);

  return {
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
    hideOptionsList,
  };
};

export const useToggleOption = <ValueItemType, DataType>(
  optionsList: Option<ValueItemType, DataType>[],
  onChange: SelectProps<ValueItemType, DataType>["onChange"]
): SelectContext<ValueItemType>["toggleOption"] => {
  return (itemToToggle: ValueItemType) => {
    onChange((value) => {
      const filter = value.includes(itemToToggle)
        ? (option: Option<ValueItemType, DataType>) =>
            //filter out itemToToggle
            !isMapKeqEqual(option.value, itemToToggle) &&
            //pass other items
            value.includes(option.value)
        : (option: Option<ValueItemType, DataType>) =>
            //pass itemToToggle
            isMapKeqEqual(option.value, itemToToggle) ||
            //pass other items
            value.includes(option.value);

      return optionsList.filter(filter).map((opt) => opt.value);
    });
  };
};
