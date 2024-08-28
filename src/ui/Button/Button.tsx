import {
  type ComponentPropsWithRef,
  type FunctionComponent,
  type SVGProps,
} from "react";
import cl from "classnames";

import styles from "./Button.module.css";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  PrefixIcon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
};

export const Button = ({
  type = "button",
  PrefixIcon,
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button {...rest} type={type} className={cl(className, styles.root)}>
      <PrefixIcon className={styles.icon} />
      {children}
    </button>
  );
};
