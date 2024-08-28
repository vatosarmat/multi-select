import { type ComponentPropsWithRef } from "react";
import cl from "classnames";

import styles from "./Spinner.module.css";

export type SpinnerProps = ComponentPropsWithRef<"div"> & {
  innerClassName: string;
};

export const Spinner = ({ className, innerClassName }: SpinnerProps) => {
  return (
    <div className={className}>
      <div className={cl(styles.circle, innerClassName)} />
    </div>
  );
};
