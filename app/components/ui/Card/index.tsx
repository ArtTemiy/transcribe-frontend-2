import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className
}) => {
  return (
    <div className={classNames(styles.card, className)}>
      {children}
    </div>
  );
};

export default Card;