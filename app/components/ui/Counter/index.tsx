import React from "react";
import styles from "./index.module.scss";

type CounterProps = {
  current: number;
  max: number;
  className?: string;
};

const Counter: React.FC<CounterProps> = ({ current, max, className }) => {
  const isError = current > max;
  return (
    <span className={`${styles.counter} ${isError ? styles.error : ""} ${className || ""}`}>
      {current}/{max}
    </span>
  );
};

export default Counter;