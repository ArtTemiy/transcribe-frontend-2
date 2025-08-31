import React from "react";
import styles from "./index.module.scss";

const imgIcon = "http://localhost:3845/assets/66c10af71339b2d6650b470b0669d0cff9293db7.svg";
const img = "http://localhost:3845/assets/06ec80b1e5f14d821d6d197be2a41fc931331eab.svg";

function IconArrowLeft({ color = "black" }: { color?: "black" | "white" }) {
  return (
    <span className={styles.iconArrowLeft}>
      <img
        src={color === "white" ? img : imgIcon}
        alt="arrow left"
        draggable={false}
        width={20}
        height={20}
      />
    </span>
  );
}

export interface ButtonSliderProps {
  state?: "default" | "hover";
}

const ButtonSlider: React.FC<ButtonSliderProps> = ({ state = "default" }) => {
  return (
    <button
      className={
        state === "hover"
          ? styles.buttonSlider + " " + styles.hover
          : styles.buttonSlider
      }
      type="button"
    >
      <IconArrowLeft color={state === "hover" ? "white" : "black"} />
    </button>
  );
};

export default ButtonSlider;