import cl from "classnames";

import XIcon from "src/assets/X.svg?react";
import CheckIcon from "src/assets/checkbox-list.svg?react";
import { Button } from "src/ui/Button";

import { Select, type SelectProps } from "src/Select";
import { highlightSubstring } from "src/lib";

import type { UserId, UserInfo } from "./types";
import styles from "./CustomSelect.module.scss";

const renderOptionInValueDisplay: SelectProps<
  UserId,
  UserInfo
>["renderOptionInValueDisplay"] = (option, ctx) => {
  return (
    <div
      key={option.key}
      className={cl(styles.optionInValueDisplay, {
        [styles.disabled]: option.disabled,
      })}
    >
      <div className={styles.userChip}>
        <img
          className={styles.avatar}
          src={option.data.avatarUrl}
          alt={option.data.name}
        />
        <div className="text-figma-text-12 text-figma-color-text-accent">
          {option.data.name}
        </div>
      </div>
      <Button
        className="w-4 h-4"
        PrefixIcon={XIcon}
        onClick={(evt) => {
          evt.stopPropagation();
          ctx.toggleOption(option.value);
        }}
      />
    </div>
  );
};

const renderOptionInOptionsList: SelectProps<
  UserId,
  UserInfo
>["renderOptionInOptionsList"] = (option, ctx) => {
  return (
    <div
      key={option.key}
      className={cl(
        styles.optionInOptionsList,
        "text-figma-color-text-primary",
        "text-figma-body-default",
        {
          [styles.disabled]: option.disabled,
        }
      )}
      onClick={
        option.disabled ? undefined : () => ctx.toggleOption(option.value)
      }
    >
      <div className={styles.userCard}>
        <img
          className={styles.avatar}
          src={option.data.avatarUrl}
          alt={option.data.name}
        />
        <div className="text-figma-text-body-accent text-figma-color-text-primary">
          {highlightSubstring(
            option.data.name,
            ctx.searchQuery,
            "bg-purple-100 text-figma-color-bg-accent-violet"
          )}
        </div>
        <div className="text-figma-text-body-caption  text-figma-color-text-tertiary">
          {option.data.position}
        </div>
      </div>
      {ctx.value.includes(option.value) && (
        <CheckIcon className={styles.checkIcon} />
      )}
    </div>
  );
};

const onFilterSortOptions: SelectProps<
  UserId,
  UserInfo
>["onFilterSortOptions"] = (options, query) => {
  if (query.length === 0) {
    return options;
  } else {
    return options.filter((opt) => {
      return opt.data.name.toLowerCase().includes(query.toLowerCase());
    });
  }
};

export type CustomSelectProps = Omit<
  SelectProps<UserId, UserInfo>,
  | "renderOptionInOptionsList"
  | "renderOptionInValueDisplay"
  | "onFilterSortOptions"
>;

export const CustomSelect = (props: CustomSelectProps) => {
  return (
    <Select
      {...props}
      onFilterSortOptions={onFilterSortOptions}
      renderOptionInOptionsList={renderOptionInOptionsList}
      renderOptionInValueDisplay={renderOptionInValueDisplay}
    />
  );
};
